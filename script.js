const elements = document.querySelectorAll(
    '.hero-content, .hero-right, .stat, .work-card, .contact-section'
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

elements.forEach((element, index) => {
    element.classList.add('reveal');

    element.style.transitionDelay = `${index * 70}ms`;

    observer.observe(element);
});
