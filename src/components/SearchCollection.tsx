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
  // There was "entry_name" gotta use it later.
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
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Control Panel*/}
      <div class="col-span-3 sm:col-span-1">
        <div class="sticky top-24 mt-7">
          {/* Search Bar */}
          <SearchBar
            onSearchInput={onSearchInput}
            query={query}
            setQuery={setQuery}
            placeholderText={`Wyszukaj`}
          />
          {/* Tag Filters */}
          <div class="relative flex flex-row justify-between w-full">
            <p class="text-sm font-semibold uppercase my-4 text-black dark:text-white">
              Tagi
            </p>
            {filter().size > 0 && (
              <button
                onClick={clearFilters}
                class="absolute flex justify-center items-center h-full w-10 right-0 top-0 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300"
              >
                <div class="flex items-center justify-center">
                  <i class="ph ph-x text-2xl hover:scale-105"></i>
                </div>
              </button>
            )}
          </div>
          <ul class="flex flex-wrap sm:flex-col gap-1.5">
            <For each={tags}>
              {(tag) => (
                <li class="sm:w-full">
                  <button
                    onClick={() => toggleTag(tag)}
                    class={cn(
                      "w-full px-2 py-1 rounded",
                      "flex gap-2 items-center",
                      "bg-black/5 dark:bg-white/10",
                      "hover:bg-black/10 hover:dark:bg-white/15 active:scale-95",
                      "transition-all duration-300 ease-in-out",
                      filter().has(tag) && "text-black dark:text-white",
                    )}
                  >
                    <div
                      class={cn(
                        "relative shrink-0 size-5 flex items-center justify-center fill-black/50 dark:fill-white/50",
                        "transition-colors duration-300 ease-in-out",
                        filter().has(tag) && "fill-black dark:fill-white",
                      )}
                    >
                      {/* Checked icon */}
                      <i
                        class={cn(
                          "ph ph-check-square text-2xl absolute transition-all duration-300 ease-in-out",
                          filter().has(tag)
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-90",
                        )}
                      />
                      {/* Empty icon */}
                      <i
                        class={cn(
                          "ph ph-square text-2xl absolute transition-all duration-300 ease-in-out",
                          filter().has(tag)
                            ? "opacity-0 scale-90"
                            : "opacity-100 scale-100",
                        )}
                      />
                    </div>

                    <span class="truncate block min-w-0 pt-[2px]">{tag}</span>
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
      {/* Posts */}
      <div class="col-span-3 sm:col-span-2">
        <div class="flex flex-col">
          {/* Info Bar */}
          <div class="flex justify-between flex-row mb-2">
            <div class="text-sm uppercase">
              {collection().length} / {data.length}
            </div>
            <button
              onClick={toggleDescending}
              class="flex flex-row gap-1 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 hover:dark:text-neutral-300 transition-all"
            >
              <div class="text-sm uppercase">
                {descending() ? "OD NAJSTARSZYCH" : "OD NAJNOWSZYCH"}
              </div>

              {/* Icon wrapper */}
              <div class="relative size-5 flex items-center justify-center">
                {/* Ascending icon */}
                <i
                  class={cn(
                    "ph ph-sort-ascending text-lg absolute transition-all duration-300 ease-in-out",
                    descending()
                      ? "opacity-0 scale-90"
                      : "opacity-100 scale-100",
                  )}
                />

                {/* Descending icon */}
                <i
                  class={cn(
                    "ph ph-sort-descending text-lg absolute transition-all duration-300 ease-in-out",
                    descending()
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90",
                  )}
                />
              </div>
            </button>
          </div>
          <ul class="flex flex-col gap-3">
            {collection().map((entry) => (
              <li>
                <ArrowCard entry={entry} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
