import { formatDate } from "@lib/utils";
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
    <div>
      {entry.collection === "projects" ? (
        // Special design for "projects"
        <a
          href={getEntryLink()}
          class="group h-80 p-4 gap-3 flex items-center border rounded-lg hover:scale-105 hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-all duration-300 ease-in-out relative"
        >
          {entry.data.imageUrl && (

            <div class="absolute rounded-lg overflow-hidden inset-0 flex justify-center items-center group-hover:scale-[0.90] transition-all duration-500 ease-in-out">
              <img
                src={entry.data.imageUrl}
                alt={entry.data.title}
                class="absolute scale-100 rounded-lg inset-0 w-full h-full object-cover object-center filter grayscale brightness-[0.3] blur-[4px] transition-transform duration-300 ease-in-out"
                decoding="async"
                loading="lazy"
              />
            </div>


          )}

          <div class="w-full z-10 relative group-hover:text-black group-hover:dark:text-white">
            <div class="flex flex-wrap items-center gap-2">
              {pill && (
                <div class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
                  Projekty
                </div>
              )}
              <div class="text-sm uppercase text-gray-200 drop-shadow-md drop-shadow-black">
                {entry.data.date
                  ? formatDate(entry.data.date)
                  : "No date available"}
              </div>
            </div>
            <div class="font-semibold mt-3 text-gray-200 dark:text-white drop-shadow-md drop-shadow-black">
              {entry.data.title}
            </div>
            <div class="text-sm line-clamp-2 text-gray-200 drop-shadow-md drop-shadow-black">{entry.data.summary}</div>
            <ul class="flex flex-wrap mt-2 gap-1 drop-shadow-md drop-shadow-black">
              {entry.data.tags.map((tag: string) => (
                <li class="text-xs uppercase py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-gray-200/75 dark:text-white/75">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white z-10"
          >
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
              class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
            />
            <polyline
              points="12 5 19 12 12 19"
              class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
            />
          </svg>
        </a>
      ) : (
        // Normal Card Design
        <a
          href={getEntryLink()}
          class="group p-4 gap-3 flex items-center border rounded-lg hover:scale-105 hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-all duration-300 ease-in-out relative"
        >
          <div class="w-full z-10 relative group-hover:text-black group-hover:dark:text-white">
            <div class="flex flex-wrap items-center gap-2">
              {pill && (
                <div class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
                  {entry.collection === "blog" ? "post" : "Członek Teamu"}
                </div>
              )}
              <div class="text-sm uppercase">
                {entry.data.date
                  ? formatDate(entry.data.date)
                  : ""}
              </div>
            </div>
            <div class="font-semibold mt-3 text-black dark:text-white">
              {entry.data.title}
            </div>
            <div class="text-sm line-clamp-2">{entry.data.summary}</div>
            <ul class="flex flex-wrap mt-2 gap-1">
              {entry.data.tags.map((tag: string) => (
                <li class="text-xs uppercase py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white z-10"
          >
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
              class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
            />
            <polyline
              points="12 5 19 12 12 19"
              class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
            />
          </svg>
        </a>
      )}
    </div>
  );
}
