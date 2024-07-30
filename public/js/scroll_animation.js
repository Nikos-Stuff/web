function run () {
    // Select elements with the attribute fancy-scroll="true"
    const elements = document.querySelectorAll('[fancy-scroll="true"]');

    // Create an IntersectionObserver instance with rootMargin
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is in the viewport
                if (!entry.target.classList.contains('scale-in-bottom')) {
                    entry.target.classList.add('scale-in-bottom');
                }
                // Ensure 'scale-out-top' class is removed when the element is in view
                entry.target.classList.remove('scale-out-top');
            } else {
                // Element is out of the viewport
                if (!entry.target.classList.contains('scale-out-top')) {
                    entry.target.classList.add('scale-out-top');
                }
                // Ensure 'scale-in-bottom' class is removed when the element is out of view
                entry.target.classList.remove('scale-in-bottom');
            }
        });
    }, {
        root: null, // Use the viewport as the root
        rootMargin: '-250px 0px', // Add a 200px margin at the top and bottom
        threshold: [0] // Trigger callback when element is fully out or in view
    });

    // Observe each element with the custom attribute
    elements.forEach(element => observer.observe(element));
}

run()
