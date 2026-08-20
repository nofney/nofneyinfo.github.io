// Smooth reveal animations

const elements = document.querySelectorAll(
    '.hero-content, .section-header, .project-card, .about-text, .email'
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    {
        threshold: 0.12
    }
);

elements.forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
});
