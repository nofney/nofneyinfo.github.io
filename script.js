const revealElements = document.querySelectorAll(
    '.hero-left, .avatar-container, .stat, .project, .about-content, .contact'
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

revealElements.forEach((element, index) => {

    element.classList.add('reveal');

    element.style.transitionDelay = `${index * 0.04}s`;

    observer.observe(element);

});
