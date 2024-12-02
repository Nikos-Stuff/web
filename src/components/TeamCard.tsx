// components/ArrowCard.astro


import { formatDate } from "@lib/utils";
import type { CollectionEntry } from "astro:content";

type Props = {
    entry: CollectionEntry<"team">; // Include team collection type
    pill?: boolean;
};

export default function TeamCard({ entry, pill }: Props) {
    const getEntryLink = () => {
        switch (entry.collection) {
            case "team":
                return `/team/${entry.id}`;
            default:
                return "/";
        }
    };

    return (
        <a href={getEntryLink()}  class="group h-80 p-4 gap-3 flex items-center border rounded-lg hover:scale-105 hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-all duration-300 ease-in-out relative">

            {entry.data.imageUrl && (

                <div class="absolute rounded-lg overflow-hidden inset-0 flex items-center justify-center group-hover:scale-[0.90] transition-all duration-500 ease-in-out ">
                        <img
                            src={entry.data.imageUrl}
                            alt={entry.data.title}
                            class="absolute rounded-lg inset-0 w-full h-max object-cover object-center filter grayscale brightness-[0.3] blur-[4px] transition-transform duration-300 ease-in-out"
                            id="parallaxImage"
                            decoding="async"
                            loading="eager"
                        />
                    </div>

                    )}


                    <div class="w-full z-10 relative group-hover:text-black group-hover:dark:text-white blend">

                <div class="flex flex-wrap items-center gap-2">
                    {pill && (
                        <div
                            class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
                        </div>
                    )}
                    {/* <div class="text-sm uppercase">
                        {entry.collection === "team" ? "" : formatDate(entry.data.date)}
                    </div> */}
                </div>
                <div class="font-semibold mt-3 text-white">
                    {entry.data.title}
                </div>
                <div class="text-sm line-clamp-2 text-white">
                    {entry.data.summary}
                </div>
                <ul class="flex flex-wrap mt-2 gap-1">
                    {entry.data.tags.map((tag: string) => (
                        <li class="text-xs uppercase py-0.5 px-1 rounded bg-white/20 text-white/75">
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>


            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                 class="stroke-white  group-hover:stroke-white z-10">
                <line x1="5" y1="12" x2="19" y2="12"
                      class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out"/>
                <polyline points="12 5 19 12 12 19"
                          class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out"/>
            </svg>
        </a>

    );
}

