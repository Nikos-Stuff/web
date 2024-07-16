// JavaScript to handle the click and move elements
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    document.body.addEventListener('click', function(event) {
        // Check if the clicked element is a div and its id contains 'Workshop'
        console.log('Element class:', event.target.id);
        if (event.target.id.includes('workshop')) {
            console.log('Clicked element:', event.target);
            console.log('Element ID:', event.target.id);

            // Get the clicked element
            const clickedElement = event.target;

            // Get the target container
            const targetContainer = document.getElementById('installed');
            console.log('Target container:', targetContainer);

            // Move the clicked element to the target container
            if (targetContainer) {
                targetContainer.appendChild(clickedElement);
                console.log('Element moved to installed:', clickedElement);
            } else {
                console.error('Target container not found');
            }
        } else {
            console.log('Clicked element is not a Workshop element');
        }
    });
});