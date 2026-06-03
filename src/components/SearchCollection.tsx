import type { CollectionEntry } from "astro:content";
import { createEffect, createSignal, For, onMount } from "solid-js";
import Fuse from "fuse.js";
import ArrowCard from "@components/ArrowCard";
import { cn } from "@lib/utils";
import SearchBar from "@components/SearchBar";

type Props = {
  entry_name: string;
  tags: string[];
  data:
    | CollectionEntry<"blog">[]
    | CollectionEntry<"projects">[]
    | CollectionEntry<"team">[];
};

export default function SearchCollection({ data, tags }: Props) {
  const coerced = data.map((entry) => entry as CollectionEntry<"blog">);

  const [query, setQuery] = createSignal("");
  const [filter, setFilter] = createSignal(new Set<string>());
  const [collection, setCollection] = createSignal<CollectionEntry<"blog">[]>(
    [],
  );
  const [descending, setDescending] = createSignal(false);

  const fuse = new Fuse(coerced, {
    keys: ["slug", "data.title", "data.summary", "data.tags"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.4,
  });

  createEffect(() => {
    const filtered = (
      query().length < 2
        ? coerced
        : fuse.search(query()).map((result) => result.item)
    ).filter((entry) =>
      Array.from(filter()).every((value) =>
        entry.data.tags.some(
          (tag: string) => tag.toLowerCase() === String(value).toLowerCase(),
        ),
      ),
    );
    setCollection(descending() ? filtered.toReversed() : filtered);
  });

  function toggleDescending() {
    setDescending(!descending());
  }

  function toggleTag(tag: string) {
    setFilter(
      (prev) =>
        new Set(
          prev.has(tag) ? [...prev].filter((t) => t !== tag) : [...prev, tag],
        ),
    );
  }

  function clearFilters() {
    setFilter(new Set<string>());
  }

  const onSearchInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setQuery(target.value);
  };

  onMount(() => {
    const wrapper = document.getElementById("search-collection-wrapper");
    if (wrapper) {
      wrapper.style.minHeight = "unset";
    }
  });

  return (
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="col-span-1">
        <div class="sticky top-24 space-y-4">
          {/* Search Input Container */}
          <div class="bg-neutral-900/10 rounded-xl">
            <SearchBar
              onSearchInput={onSearchInput}
              query={query}
              setQuery={setQuery}
              placeholderText={`Wyszukaj...`}
            />
          </div>

          {/* Tags Section Title Block */}
          <div class="flex flex-row justify-between items-center w-full px-1">
            <p class="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Filtruj Tagi
            </p>
            {filter().size > 0 && (
              <button
                onClick={clearFilters}
                class="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Wyczyść</span>
                <i class="ph ph-x text-sm"></i>
              </button>
            )}
          </div>

          {/* Tags Stack Layout */}
          <ul class="flex flex-wrap md:flex-col gap-1.5">
            <For each={tags}>
              {(tag) => (
                <li class="md:w-full">
                  <button
                    onClick={() => toggleTag(tag)}
                    class={cn(
                      "w-full px-3 py-2 rounded-lg text-sm font-medium flex gap-3 items-center border transition-all duration-200 text-left",
                      filter().has(tag)
                        ? "bg-neutral-800/60 text-white border-white/30"
                        : "bg-neutral-800/30 text-neutral-400 border-transparent hover:border-black/10 hover:text-white",
                    )}
                  >
                    <div class="relative shrink-0 size-4 flex items-center justify-center">
                      {/* Active State Ring Marker */}
                      <div
                        class={cn(
                          "absolute size-2.5 rounded-full transition-all duration-300",
                          filter().has(tag)
                            ? "bg-white scale-100 opacity-100"
                            : "bg-transparent scale-50 opacity-0 border border-neutral-400",
                        )}
                      />
                      {/* Idle State Dot Marker */}
                      {!filter().has(tag) && (
                        <div class="size-1.5 rounded-full bg-neutral-600/50" />
                      )}
                    </div>

                    <span class="truncate block min-w-0 pt-px">{tag}</span>
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>

      <div class="col-span-1 md:col-span-2">
        <div class="flex flex-col space-y-4">
          {/* List Meta Header Bar */}
          <div class="flex justify-between items-center flex-row px-1">
            <div class="text-xs font-mono tracking-wider text-neutral-400">
              Wyniki: {collection().length}{" "}
              <span class="text-neutral-700">/</span> {data.length}
            </div>

            <button
              onClick={toggleDescending}
              class="flex flex-row items-center gap-1.5 text-xs font-semibold tracking-wider text-neutral-400 hover:text-white transition-colors"
            >
              <span class="uppercase">
                {descending() ? "Od Najstarszych" : "Od Najnowszych"}
              </span>

              <div class="relative size-4 flex items-center justify-center text-sm">
                <i
                  class={cn(
                    "ph ph-sort-ascending absolute transition-all duration-300",
                    descending()
                      ? "opacity-0 scale-75"
                      : "opacity-100 scale-100",
                  )}
                />
                <i
                  class={cn(
                    "ph ph-sort-descending absolute transition-all duration-300",
                    descending()
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75",
                  )}
                />
              </div>
            </button>
          </div>

          {/* Core Collection Mapping Output Grid */}
          <ul class="grid grid-cols-1 gap-4">
            {collection().map((entry) => (
              <li class="w-full">
                <ArrowCard entry={entry} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
