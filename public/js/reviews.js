document.addEventListener('astro:page-load', () => {
    const reviewItem = document.getElementById('review-item');
    const reviews = [
        { name: "Katzby", review: "This beautiful service & website is officially lynx-approved. Mrawr.", icon: "🐈" },
        { name: "lilbigwhiteowl", review: "Video Editing | Recommended.", icon: "🎥" },
        { name: "giljacek", review: "Video Editing | Fast and perfect execution.", icon: "⏰" },
        { name: "codewizard", review: "Web Development | Outstanding code quality and support.", icon: "🧙‍♂️" },
        { name: "filmfanatic", review: "Video Editing | Exceptional quality and attention to detail.", icon: "🎬" },
        { name: "devmaster", review: "Web Development | Professional and efficient service.", icon: "💼" }
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
                <p class="text-[4rem] md:text-[5rem] lg:text-[7rem] font-bold text-black dark:text-white mt-0 mb-0">${review.icon}</p>
            </div>
        `;
        reviewItem.classList.remove('active');
        void reviewItem.offsetWidth;
        reviewItem.classList.add('active');

        const reviewNameElement = reviewItem.querySelector('.review-name');
        const reviewTextElement = reviewItem.querySelector('.review-text p');
        const reviewIconElement = reviewItem.querySelector('.review-icon p');

        typeText(reviewNameElement, review.name, 50, () => {
            typeText(reviewTextElement, review.review, 50, () => {
                deletingTimeout = setTimeout(() => {
                    deleteText(reviewTextElement, 30, () => {
                        deleteText(reviewNameElement, 30, () => {
                            reviewIconElement.classList.add('flip-out-hor-top');
                            setTimeout(() => {
                                typingTimeout = setTimeout(showNextReview, 100); // Reduce delay for faster transition
                            }, 800); // Adjust the timing based on the animation duration
                        });
                    });
                }, 4000); // Delay before starting deletion
            });
        });

        currentIndex = nextIndex;
    }

    if (reviews.length > 0) {
        showNextReview(); // Show the initial review
    }

    console.log('Reviews Loaded');
});
