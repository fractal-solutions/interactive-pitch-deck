document.addEventListener('DOMContentLoaded', () => {
    
    // --- Accordion Logic ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Initialize: Set max-height for any pre-expanded items
    document.querySelectorAll('.accordion-item.expanded').forEach(item => {
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + "px";
    });

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const currentContent = currentItem.querySelector('.accordion-content');
            const isExpanded = currentItem.classList.contains('expanded');

            // Close all other items (Accordion behavior)
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('expanded');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current item
            if (isExpanded) {
                currentItem.classList.remove('expanded');
                currentContent.style.maxHeight = null;
            } else {
                currentItem.classList.add('expanded');
                currentContent.style.maxHeight = currentContent.scrollHeight + "px";
            }
        });
    });


    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // If elements have animation classes, pause them initially if not in view
    // Note: The CSS defines the animation, but we can rely on standard CSS behavior 
    // or add a class like 'visible' to trigger.
    // For simplicity, let's just add a 'visible' class to elements we want to fade in.
    // However, my CSS used 'fade-in-up' which runs immediately. 
    // Let's tweak this: We'll add 'reveal' class on scroll.
    
    // Actually, simply relying on CSS animations running on load for Hero is fine.
    // For scrolling down, let's leave it simple for now as the request didn't strictly require complex scroll triggers.
    // But to be "Cutting Edge", a subtle scroll reveal is nice.
    
    // Let's select elements to animate on scroll
    const scrollElements = document.querySelectorAll('.accordion-item, .cta-banner');
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Re-use the observer to trigger the transition
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollElements.forEach(el => scrollObserver.observe(el));

});