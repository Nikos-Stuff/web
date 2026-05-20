import { formatDate, truncateText } from "@lib/utils";
import type { CollectionEntry } from "astro:content";

type Props = {
  entry:
    | CollectionEntry<"blog">
    | CollectionEntry<"projects">
    | CollectionEntry<"team">;
  pill?: boolean;
};

export default function ArrowCard({ entry, pill }: Props) {
  const getEntryLink = () => {
    switch (entry.collection) {
      case "blog":
        return `/blog/${entry.id}`;
      case "projects":
        return `/projects/${entry.id}`;
      case "team":
        return `/team/${entry.id}`;
      default:
        return "/";
    }
  };

  return (
    <div class="animate">
      {entry.collection === "projects" ? (
        /* ========================================================================= */
        /* 1. PROJECTS CARD (Full background image with subtle brightness hover)     */
        /* ========================================================================= */
        <a
          href={getEntryLink()}
          class="group h-64 p-6 flex items-end border rounded-xl border-white/10 bg-neutral-900 transition-all duration-300 relative overflow-hidden"
        >
          {entry.data.imageUrl && (
            <div class="absolute inset-0 z-0">
              <img
                src={entry.data.imageUrl}
                alt={entry.data.title}
                class="absolute inset-0 w-full h-full object-cover object-center filter grayscale brightness-[0.35] group-hover:brightness-[0.55] transition-all duration-500 ease-out"
                decoding="async"
                loading="lazy"
              />
              {/* Premium clean multi-stop gradient for crisp text readability */}
              <div class="absolute inset-0 bg-linear-to-trom-neutral-950 via-neutral-950/40 to-transparent"></div>
            </div>
          )}

          {/* Left Side: Content */}
          <div class="w-full z-10 relative text-white space-y-2 pr-8">
            <div class="flex flex-wrap items-center gap-2">
              {pill && (
                <div class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border border-white/20 bg-white/5 text-white">
                  Projekt
                </div>
              )}
              <div class="text-xs font-medium text-neutral-400">
                {entry.data.date ? formatDate(entry.data.date) : "Brak daty"}
              </div>
            </div>
            
            <h4 class="font-bold text-xl text-white tracking-tight">
              {entry.data.title}
            </h4>
            
            <p class="text-xs text-neutral-300 line-clamp-2 max-w-xl leading-relaxed">
              {entry.data.summary}
            </p>
            
            <ul class="flex flex-wrap gap-1 pt-1">
              {entry.data.tags.map((tag: string) => (
                <li class="text-[10px] uppercase tracking-wide py-0.5 px-1.5 rounded bg-white/10 text-neutral-200 border border-white/5">
                  {truncateText(tag, 20)}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Animated Link Arrow */}
          <div class="absolute right-6 bottom-6 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-neutral-400 group-hover:stroke-white transition-colors duration-300"
            >
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
              />
              <polyline
                points="12 5 19 12 12 19"
                class="-translate-x-1 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
              />
            </svg>
          </div>
        </a>
      ) : entry.collection === "blog" ? (
        /* ========================================================================= */
        /* 2. BLOG CARD (Clean Minimal Row UI)                                       */
        /* ========================================================================= */
        <a
          href={getEntryLink()}
          class="group p-5 flex items-center justify-between border rounded-xl border-white/10 bg-neutral-900/10 hover:bg-neutral-900/40 transition-colors duration-300 relative"
        >
          <div class="w-full space-y-2 pr-8">
            <div class="flex flex-wrap items-center gap-2">
              {pill && (
                <div class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-neutral-400">
                  Artykuł
                </div>
              )}
              <div class="text-xs text-neutral-500 font-medium">
                {entry.data.date ? formatDate(entry.data.date) : ""}
              </div>
            </div>

            <h4 class="font-bold text-lg text-white tracking-tight">
              {entry.data.title}
            </h4>

            <p class="text-xs text-neutral-400 line-clamp-2 leading-relaxed max-w-xl">
              {entry.data.summary}
            </p>

            <ul class="flex flex-wrap gap-1 pt-1">
              {entry.data.tags.map((tag: string) => (
                <li class="text-[10px] uppercase tracking-wide py-0.5 px-1.5 rounded bg-white/10 xt-neutral-400 border border-white/5">
                  {truncateText(tag, 20)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-neutral-500 group-hover:stroke-white transition-colors duration-300"
            >
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
              />
              <polyline
                points="12 5 19 12 12 19"
                class="-translate-x-1 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
              />
            </svg>
          </div>
        </a>
      ) : entry.collection === "team" ? (
        /* ========================================================================= */
        /* 3. TEAM CARD (Matches Projects Layout)                                    */
        /* ========================================================================= */
        <a
          href={getEntryLink()}
          class="group h-64 p-6 flex items-end border rounded-xl border-white/10 bg-neutral-900 transition-all duration-300 relative overflow-hidden"
        >
          {entry.data.imageUrl && (
            <div class="absolute inset-0 z-0">
              <img
                src={entry.data.imageUrl}
                alt={entry.data.title}
                class="absolute inset-0 w-full h-full object-cover object-center filter grayscale brightness-[0.35] group-hover:brightness-[0.55] transition-all duration-500 ease-out"
                decoding="async"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-linear-to-trom-neutral-950 via-neutral-950/40 to-transparent"></div>
            </div>
          )}

          <div class="w-full z-10 relative text-white space-y-2 pr-8">
            {pill && (
              <div class="w-fit text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border border-white/20 bg-white/5 text-white">
                Członek Zespołu
              </div>
            )}
            
            <h4 class="font-bold text-xl text-white tracking-tight">
              {entry.data.title}
            </h4>
            
            <p class="text-xs text-neutral-300 line-clamp-2 max-w-xl leading-relaxed">
              {entry.data.summary}
            </p>
            
            <ul class="flex flex-wrap gap-1 pt-1">
              {entry.data.tags.map((tag: string) => (
                <li class="text-[10px] uppercase tracking-wide py-0.5 px-1.5 rounded bg-white/10 text-neutral-200 border border-white/5">
                  {truncateText(tag, 20)}
                </li>
              ))}
            </ul>
          </div>

          <div class="absolute right-6 bottom-6 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-neutral-400 group-hover:stroke-white transition-colors duration-300"
            >
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
              />
              <polyline
                points="12 5 19 12 12 19"
                class="-translate-x-1 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
              />
            </svg>
          </div>
        </a>
      ) : (
        /* Fallback */
        <div class="p-4 text-xs font-mono text-red-400 border border-red-500/10 bg-red-500/5 rounded-xl">
          ERROR: Nieobsługiwany typ kolekcji.
        </div>
      )}
    </div>
  );
}