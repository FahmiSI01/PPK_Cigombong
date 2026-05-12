document.addEventListener('DOMContentLoaded', function() {

    // =====================
    // AOS INIT
    // =====================
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        easing: 'ease-in-out',
        offset: 50
    });

    // =====================
    // SMOOTH SCROLL NAVBAR
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================
    // SWIPER PENGURUS
    // =====================
    const swiperPengurus = new Swiper(".pengurusSwiper", {
        loop: true,
        speed: 1000,
        spaceBetween: 40,

        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // =====================
    // OBSERVER AUTOPLAY
    // =====================
    const pengurusSection = document.querySelector("#pengurus");

    if (pengurusSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    swiperPengurus.autoplay.start();
                } else {
                    swiperPengurus.autoplay.stop();
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(pengurusSection);
    }

    // =====================
    // MODAL FUNCTION
    // =====================
    function openModalFunc(title, content) {
        const modal = document.getElementById("modal");
        const modalTitle = document.getElementById("modalTitle");
        const modalBody = document.getElementById("modalBody");

        modalTitle.innerText = title;

        if (Array.isArray(content)) {
            modalBody.innerHTML = `
                <ul class="list-disc pl-5 space-y-1 text-gray-300">
                    ${content.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
        } else {
            modalBody.innerHTML = `<p class="text-gray-300">${content}</p>`;
        }

        modal.classList.remove("hidden");
    }

    // 🔥 WAJIB: supaya bisa dipanggil dari HTML onclick
    window.openModalFunc = openModalFunc;

    // =====================
    // SCROLL FIX
    // =====================
    const scrollBox = document.getElementById("seleksiScroll");

    if (scrollBox) {
        scrollBox.addEventListener("wheel", function(e){
            const atTop = scrollBox.scrollTop === 0;
            const atBottom = scrollBox.scrollHeight - scrollBox.scrollTop === scrollBox.clientHeight;

            if(!atTop && !atBottom){
                e.stopPropagation();
            }
        });
    }

    // =====================
    // AOS REFRESH
    // =====================
    setTimeout(() => {
        AOS.refresh();
    }, 300);

});