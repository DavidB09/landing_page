(function translateElements() {
    const initialElem = document.querySelectorAll('.initial-slide');

    const revealElement = (entries, observer) => {
        const [entry] = entries;
        entry.target.classList.remove('initial-hidden');
        observer.unobserve(entry.target);
    }

    const sectionObserver = new IntersectionObserver(revealElement, { threshold: [0, 0.1] });

    initialElem.forEach((element) => {
        sectionObserver.observe(element);
        element.classList.add('initial-hidden');
    });
})(); 

(function initializeSlider() {
    const slides = document.querySelectorAll('.container-review');
    const btnLeft = document.querySelector('.button-left');
    const btnRight = document.querySelector('.button-right');

    let currentSlide = 0;
    const maxSlide = slides.length;

    const goToSlide = (slide) => {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${1000 * (i - slide)}px)`)
        );
    }

    const handleNextSlide = () => {
        if (currentSlide === maxSlide - 1) currentSlide = 0;
        else currentSlide++;

        goToSlide(currentSlide);
    }

    const handlePrevSlide = () => {
        if (currentSlide === 0) currentSlide = maxSlide - 1;
        else currentSlide--;

        goToSlide(currentSlide);
    }

    goToSlide(0);

    btnRight.addEventListener('click', handleNextSlide);
    btnLeft.addEventListener('click', handlePrevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') handleNextSlide();
        if (e.key === 'ArrowLeft') handlePrevSlide();
    });
})();