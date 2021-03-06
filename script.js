window.onunload = () => window.scrollTo(0,0); // Go to top of window when page refreshed

// ELEMENTS TRANSLATE //

(function translateElements() {
    const initialElements = document.querySelectorAll('.initial-slide');

    const revealElement = (entries, observer) => {
        const [entry] = entries;
        entry.target.classList.remove('initial-hidden');
        observer.unobserve(entry.target);
    }; 

    const sectionObserver = new IntersectionObserver(revealElement, { threshold: [0, 0.1] });

    initialElements.forEach((element) => {
        sectionObserver.observe(element);
        element.classList.add('initial-hidden');
    });
})(); 

// REVIEWS SLIDER //

(function initializeSlider() {
    const slides = document.querySelectorAll('.container-review');
    const buttonLeft = document.querySelector('.button-left');
    const buttonRight = document.querySelector('.button-right');

    let currentSlide = 0;
    const maxSlide = slides.length;

    const goToSlide = (slide) => {
        slides.forEach(
            (s, i) => s.style.transform = `translateX(${1500 * (i - slide)}px)`
        );
    }; 

    const handleNextSlide = () => {
        if (currentSlide === maxSlide - 1) currentSlide = 0;
        else currentSlide++;

        goToSlide(currentSlide);
    }; 

    const handlePrevSlide = () => {
        if (currentSlide === 0) currentSlide = maxSlide - 1;
        else currentSlide--;

        goToSlide(currentSlide);
    }; 

    goToSlide(0);

    buttonRight.addEventListener('click', handleNextSlide);
    buttonLeft.addEventListener('click', handlePrevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') handleNextSlide();
        if (e.key === 'ArrowLeft') handlePrevSlide();
    });
})();

// FORM INPUT //

(function handleServiceInput() {
    const serviceElems = document.querySelectorAll('.container-service'); 
    const formFirstElem = document.querySelector('form label:first-child input');
    const formElems = document.querySelectorAll('form select option'); 

    serviceElems.forEach(el => {
        el.addEventListener('click', () => {
            let attribute = el.getAttribute('data-service'); 
            formElems.forEach(option => {

                //Selects the option value to the service clicked by the user
                if (option.value == attribute) {
                    option.selected = true; 
                    formFirstElem.scrollIntoView(); 
                    formFirstElem.focus(); 
                }
            }); 
        }); 
    }); 
})(); 

// OVERLAY //

(function runSignupOverlay() {
    setTimeout(() => {
        let overlay = document.querySelector('.main-overlay'); 
        overlay.classList.remove('hidden'); 
        overlay.querySelector('.button-close').addEventListener('click', () => overlay.classList.add('hidden')); 
        overlay.addEventListener('click', (e) => {
            if (e.target == overlay) {
                overlay.classList.add('hidden')
            }
        });
    }, 1000); 
})(); 

// NAVIGATION DROPDOWN //

(function handleDropdownMenu() {
    const dropdownBtn = document.querySelector('#menu-toggle'); 
    const headerNav = document.querySelector('header nav'); 
    dropdownBtn.checked = false;

    let prevSize; 

    const setHeaderHeight = () => headerNav.style.minHeight = dropdownBtn.checked ? window.innerWidth >= 600 ? '5rem' : '15rem' : '0'; //5rem if dropdownBtn is checked, 15rem if innerWidth is greater than 600, or 0rem if neither

    function checkWindowSize() {
        //If the previous size was medium and the current size is small, or the previous size was small and the current size is medium, show previous header setting
        if (prevSize >= 600 && window.innerWidth < 600 || prevSize < 600 && window.innerWidth >= 600) setHeaderHeight(); 

        //If the previous size was large and the current size is medium, show header when clicked
        if (prevSize >= 1200 && window.innerWidth < 1200) {
            headerNav.style.minHeight = 0; 
            dropdownBtn.addEventListener('click', setHeaderHeight);
        }

        //If previous size was medium and the current size is large, show header
        if (prevSize < 1200 && window.innerWidth >= 1200) {
            document.querySelector('header nav').style.minHeight = '5rem'; 
            dropdownBtn.checked = false; 
            dropdownBtn.removeEventListener('click', setHeaderHeight); 
        }

        prevSize = window.innerWidth; 
    }

    window.addEventListener('resize', checkWindowSize); 
    dropdownBtn.addEventListener('click', setHeaderHeight);
})(); 