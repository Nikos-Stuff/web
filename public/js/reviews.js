function run() {
    const reviewItem = document.getElementById('review-item');
    const reviews = [
        { name: "Katzby", review: "This beautiful service & website is officially lynx-approved. Mrawr.", icon: `
            <svg class="fill-black dark:fill-white transition-all h-[5rem] w-[5rem] md:h-[6rem] md:w-[6rem] lg:h-[8rem] lg:w-[8rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M816-592q25.8 0 46.4 20.6Q883-550.8 883-525v44.25q0 5.55-.5 12.15-.5 6.6-3.5 11.6L768.31-193.14q-9.86 19.57-29.93 32.36Q718.31-148 698.67-148H292v-444l209-215q9.6-11 23.69-15 14.08-4 25.31 1.5 11 5.5 15 20t.2 30.5L530-592h286Zm-489 15v394h370q10 0 22-6t18-20l111-264v-52q0-13-9.5-22.5T816-557H487l47-230-207 210ZM182-148q-28.27 0-47.64-19.75Q115-187.5 115-215v-310q0-27.5 19.36-47.25Q153.73-592 182-592h110v35H182q-14 0-23 9.5t-9 22.5v310q0 14 9 23t23 9h110v35H182Zm145-35v-394 394Z"/>
            </svg>
        ` },




        { name: "lilbigwhiteowl", review: "Video Editing | Recommended.", icon: `
            <svg class="fill-black dark:fill-white transition-all h-[5rem] w-[5rem] md:h-[6rem] md:w-[6rem] lg:h-[8rem] lg:w-[8rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M202-197q-27.5 0-47.25-19.75T135-264v-432q0-27.5 19.75-47.25T202-763h432q27.5 0 47.25 19.75T701-696v191l95-95q7-7 18-2.75T825-588v216q0 10.5-11 14.75T796-361l-95-95v192q0 27.5-19.75 47.25T634-197H202Zm0-35h432q14 0 23-9t9-23v-432q0-14-9-23t-23-9H202q-14 0-23 9t-9 23v432q0 14 9 23t23 9Zm-32 0v-496 496Z"/>
            </svg>
        ` },


        { name: "giljacek", review: "Video Editing | Fast and perfect execution.", icon: `
            <svg class="fill-black dark:fill-white transition-all h-[5rem] w-[5rem] md:h-[6rem] md:w-[6rem] lg:h-[8rem] lg:w-[8rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M223-156q-27.5 0-47.25-19.75T156-223v-117q0-6.75 5.38-11.88 5.37-5.12 12.5-5.12 7.12 0 12.12 5.12 5 5.13 5 11.88v117q0 12 10 22t22 10h117q6.75 0 11.88 5.19 5.12 5.2 5.12 12.32t-5.12 12.31Q346.75-156 340-156H223Zm514 0H621q-7.72 0-12.86-5.38-5.14-5.37-5.14-12.5 0-7.12 5.14-12.12 5.14-5 12.86-5h116q12 0 22-10t10-22v-117q0-6.75 5.38-11.88 5.37-5.12 12.5-5.12 7.12 0 12.12 5.12 5 5.13 5 11.88v117q0 27.5-19.75 47.25T737-156ZM156-621v-116q0-27.5 19.75-47.25T223-804h117q6.75 0 11.88 5.19 5.12 5.2 5.12 12.32t-5.12 12.31Q346.75-769 340-769H223q-12 0-22 10t-10 22v116q0 7.72-5.19 12.86-5.2 5.14-12.32 5.14t-12.31-5.14Q156-613.28 156-621Zm613 0v-116q0-12-10-22t-22-10H621q-7.72 0-12.86-5.38-5.14-5.37-5.14-12.5 0-7.12 5.14-12.12 5.14-5 12.86-5h116q27.5 0 47.25 19.75T804-737v116q0 7.72-5.19 12.86-5.2 5.14-12.32 5.14t-12.31-5.14Q769-613.28 769-621ZM480.13-322q-65.36 0-111.74-46.25Q322-414.51 322-479.87q0-65.35 46.25-111.74Q414.51-638 479.87-638q65.35 0 111.74 46.25Q638-545.49 638-480.13q0 65.36-46.25 111.74Q545.49-322 480.13-322Zm-.01-35Q531-357 567-393.12q36-36.12 36-87T566.88-567q-36.12-36-87-36T393-566.88q-36 36.12-36 87T393.12-393q36.12 36 87 36ZM480-480Z"/>
            </svg>
        ` },




        { name: "codewizard", review: "Web Development | Outstanding code quality and support.", icon: `
            <svg class="fill-black dark:fill-white transition-all h-[5rem] w-[5rem] md:h-[6rem] md:w-[6rem] lg:h-[8rem] lg:w-[8rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M315-461q21-40 45.5-77.5T414-612l-68-14q-8-2-15.5.5T317-617L214-516q-3 3-2 7.5t5 5.5l98 42Zm459-308q-104 11-168 40.5T481-638q-40 40-72.5 87.5T346-444l112 114q59-31 107-63.5t88-72.5q61-61 90.5-124.5T784-759v-3q0-2-2-5-2-1-3.5-1.5t-4.5-.5ZM569-553q-14-13-14-31.5t14-32.5q14-14 32.5-14t32.5 14q13 14 13 32.5T634-553q-14 14-32.5 14T569-553Zm-93 254 41 98q1 4 5.5 4.5t7.5-2.5l102-101q6-6 8.5-14t.5-15l-14-69q-36 29-73.5 54T476-299Zm351-478q-5 97-42.5 181.5T683-446q-6 5-13 12t-13 11l17 86q4 18-2 34t-16 26L544-164q-14 13-31 9t-23-21l-55-129-116-116-128-55q-18-7-20.5-24t10.5-30l112-112q10-11 26.5-16t32.5-2l86 17q5-5 11-11.5t12-11.5q64-65 148.5-103T792-811q7-1 13.5 2t11.5 8q4 6 7 11t3 13ZM204-296q22-23 52-22.5t54 23.5q22 22 22 52.5T310-189q-31 30-73.5 40T151-137q2-44 11.5-86.5T204-296Zm25 25q-18 18-25 42.5T194-179q25-3 49-11t43-26q11-10 11-26.5T285-271q-12-12-28.5-11.5T229-271Z"/>
            </svg>
        ` },




        { name: "filmfanatic", review: "Video Editing | Exceptional quality and attention to detail.", icon: `
            <svg class="fill-black dark:fill-white transition-all h-[5rem] w-[5rem] md:h-[6rem] md:w-[6rem] lg:h-[8rem] lg:w-[8rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="m438-416-77-79q-5-5-13-5t-12 4q-8 7-8 14t8 13l79 78q9 11 22.5 11t24.5-11l165-164q3-4 4-12t-5-14q-5-5-12-4.5t-12 5.5L438-416Zm-93 284-52-89-102-21q-13-3-19.5-13.5T166-279l9-102-67-77q-8-9-8-22t8-23l67-76-9-102q-1-13 5.5-23.5T191-718l102-21 52-89q6-11 18-15.5t25 .5l92 41 94-41q11-4 23 0t18 15l53 89 101 21q13 3 19.5 13.5T795-681l-10 102 67 76q8 10 8 23t-8 22l-67 77 10 102q0 13-6.5 23.5T769-242l-101 21-53 89q-6 11-18 15t-23 0l-94-41-92 41q-13 4-25 0t-18-15Zm31-20 104-43 106 43 61-98 113-27-10-116 76-87-76-87 10-118-113-25-62-98-105 43-106-43-61 98-113 25 10 118-76 87 76 87-10 117 113 26 63 98Zm104-328Z"/>
            </svg>
        ` }
    ];

    let currentIndex = -1;
    let typingTimeout;
    let deletingTimeout;

    function typeText(element, text, speed, callback) {
        let index = 0;
        element.innerHTML = '';
        const intervalId = setInterval(() => {
            element.innerHTML += text[index];
            index++;
            if (index > text.length - 1) {
                clearInterval(intervalId);
                if (callback) callback();
            }
        }, speed);
    }

    function deleteText(element, speed, callback) {
        let text = element.innerHTML;
        let index = text.length;
        const intervalId = setInterval(() => {
            element.innerHTML = text.substring(0, index - 1);
            index--;
            if (index < 0) {
                clearInterval(intervalId);
                if (callback) callback();
            }
        }, speed);
    }

    function showNextReview() {
        const nextIndex = (currentIndex + 1) % reviews.length;
        const review = reviews[nextIndex];

        reviewItem.innerHTML = `
            <div class="text-content flex-1">
                <p class="review-name mt-0 mb-0 text-xl md:text-2xl lg:text-3xl font-bold uppercase text-black dark:text-white"></p>
                <div class="review-text">
                    <p class="mt-0 mb-0"></p>
                </div>
            </div>
            <div class="review-icon text-right flip-in-hor-bottom">
                <div>${review.icon}</div>
            </div>
        `;
        reviewItem.classList.remove('active');
        void reviewItem.offsetWidth;
        reviewItem.classList.add('active');

        const reviewNameElement = reviewItem.querySelector('.review-name');
        const reviewTextElement = reviewItem.querySelector('.review-text p');

        typeText(reviewNameElement, review.name, 50, () => {
            typeText(reviewTextElement, review.review, 50, () => {
                deletingTimeout = setTimeout(() => {
                    deleteText(reviewTextElement, 30, () => {
                        deleteText(reviewNameElement, 30, () => {
                            reviewItem.querySelector('.review-icon').classList.add('flip-out-hor-top');
                            setTimeout(() => {
                                typingTimeout = setTimeout(showNextReview, 100);
                            }, 800);
                        });
                    });
                }, 4000);
            });
        });

        currentIndex = nextIndex;
    }

    if (reviews.length > 0) {
        showNextReview();
    }

    console.log('Reviews Loaded');
}

run();
