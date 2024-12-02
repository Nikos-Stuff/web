// components/ArrowCard.astro


import { formatDate } from "@lib/utils";
import type { CollectionEntry } from "astro:content";

type Props = {
    entry: CollectionEntry<"nnb_workshop">
    pill?: boolean;
};


export default function ArrowCard({ entry }: Props) {

    const getEntryLink = () => {
        switch (entry.collection) {
            case "nnb_workshop":
                return `./${entry.id}`;
            default:
                return "/";
        }
    };

    return (
        <a href={getEntryLink()}  class="group p-4 gap-3 flex items-center border rounded-lg hover:scale-105 hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-all duration-300 ease-in-out relative">


            <div class="w-full z-10 relative group-hover:text-black group-hover:dark:text-white blend">

                <div class="flex flex-wrap items-center gap-2">

                    <div
                        class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
                        💾 Click to add
                    </div>
                    <div class="text-sm uppercase">
                         {entry.data.date ? formatDate(entry.data.date) : "No date available"}
                    </div>
                </div>
                <div class="font-semibold mt-3 text-black dark:text-white">
                    {entry.data.title}
                </div>
                <div class="text-sm line-clamp-2">
                    {entry.data.summary}
                </div>
                <ul class="flex flex-wrap mt-2 gap-1">
                    {entry.data.tags.map((tag: string) => (
                        <li class="text-xs uppercase py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>


            <svg id={entry.id} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                 class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white z-10">
                <line x1="5" y1="12" x2="19" y2="12"
                      class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out"/>
                <polyline points="12 5 19 12 12 19"
                          class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out"/>
            </svg>

        </a>


    );
}

