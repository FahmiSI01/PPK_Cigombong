document.addEventListener('DOMContentLoaded', function() {

    // =====================
    // AOS INIT (FIXED)
    // =====================
    AOS.init({
        duration: 1000,
        once: true,        // 🔥 FIX: biar tidak delay & tidak aneh di scroll box
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
    // SWIPER INIT
    // =====================
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 800,
        grabCursor: true,
        centeredSlides: true,
        autoplay: false,

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
    // OBSERVER SWIPER
    // =====================
    const pengurusSection = document.querySelector("#pengurus");

    if (pengurusSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    swiper.params.autoplay = {
                        delay: 5000,
                        disableOnInteraction: false,
                    };
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(pengurusSection);
    }

    // =====================
    // MODAL
    // =====================
    window.openModalFunc = function(title, desc){
        document.getElementById("modalTitle").innerText = title;
        document.getElementById("modalDesc").innerText = desc;
        document.getElementById("modalDetail").classList.remove("hidden");
        document.getElementById("modalDetail").classList.add("flex");
    }

    window.closeModalFunc = function(){
        document.getElementById("modalDetail").classList.add("hidden");
    }

    // =====================
    // SCROLL SMART FIX
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
    // AOS FORCE REFRESH (IMPORTANT FIX)
    // =====================
    setTimeout(() => {
        AOS.refresh();
    }, 300);

});