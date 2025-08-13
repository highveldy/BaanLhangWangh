document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // --- Navbar for Mobile ---
    const menuOpenButton = document.querySelector("#menu-open-button");
    const menuCloseButton = document.querySelector("#menu-close-button");
    const navLinks = document.querySelectorAll(".nav-menu .nav-link");

    const toggleMenu = (show) => {
        body.classList.toggle("show-mobile-menu", show);
    };

    if (menuOpenButton) {
        menuOpenButton.addEventListener("click", () => toggleMenu(true));
    }
    if (menuCloseButton) {
        menuCloseButton.addEventListener("click", () => toggleMenu(false));
    }
    navLinks.forEach(link => {
        link.addEventListener("click", () => toggleMenu(false));
    });

    // Close menu when clicking on the overlay
    body.addEventListener('click', (e) => {
        if (body.classList.contains('show-mobile-menu') && e.target === body) {
            toggleMenu(false);
        }
    });

    // --- Swiper Sliders ---
    const createSwiper = (selector) => {
        if (document.querySelector(selector)) {
            return new Swiper(selector, {
                loop: true,
                grabCursor: true,
                spaceBetween: 25,
                navigation: {
                    nextEl: `${selector} .swiper-button-next`,
                    prevEl: `${selector} .swiper-button-prev`,
                },
                observer: true,
                observeParents: true,
            });
        }
    };
    
    createSwiper('.about-slider');
    createSwiper('.room-slider');
    createSwiper('.pre-wedding-slider');

    // --- Category Filters (Menu & Guesthouse) ---
    const setupCategoryFilter = (buttonSelector, itemSelector, dataAttribute) => {
        const buttons = document.querySelectorAll(buttonSelector);
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset[dataAttribute];
                
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                document.querySelectorAll(itemSelector).forEach(item => {
                    const itemCategory = item.dataset[dataAttribute];
                    
                    if (dataAttribute === 'category' && itemCategory === 'other') {
                        // Special logic for menu 'other' category
                        item.style.display = (category === 'other') ? 'flex' : 'none';
                    } else {
                        const shouldShow = (category === 'all' || category === itemCategory);
                        const displayStyle = (item.tagName === 'LI' || item.tagName === 'DIV' && !item.classList.contains('guesthouse-slider-container')) ? 'flex' : 'block';
                        item.style.display = shouldShow ? displayStyle : 'none';
                    }
                });
            });
        });
    };

    setupCategoryFilter('.category-button', '.menu-item', 'category');
    setupCategoryFilter('.guesthouse-category-button', '.guesthouse-slider-container', 'guesthouseCategory');


    // --- Booking Dropdown ---
    const bookingDropdownButton = document.getElementById('bookingDropdownButton');
    const bookingDropdownWrapper = bookingDropdownButton ? bookingDropdownButton.parentElement : null;

    if (bookingDropdownButton && bookingDropdownWrapper) {
        bookingDropdownButton.addEventListener('click', (event) => {
            event.stopPropagation();
            bookingDropdownWrapper.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            if (!bookingDropdownWrapper.contains(event.target)) {
                bookingDropdownWrapper.classList.remove('show');
            }
        });
    }

    // --- Fancybox Initialization for ALL Lightboxes ---
    Fancybox.bind('[data-fancybox]', {
        loop: true,
        Thumbs: { autoStart: false },
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: [],
                right: ["thumbs", "close"],
            },
        },
        caption: (fancybox, slide) => slide.caption || "",
    });
});