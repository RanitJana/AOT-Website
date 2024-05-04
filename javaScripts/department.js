//search funcitons
let searches = document.querySelectorAll('.search');
let para = document.querySelectorAll('p');
let a = document.querySelectorAll('a');
searches.forEach(search => {
    search.childNodes[3].addEventListener('click', e => {
        let val = search.childNodes[1].value.trim();
        if (val == '') return;
        var encodedMessage = "";
        para.forEach(p => {
            if (p.innerHTML.toLowerCase().includes(val.toLowerCase())) {
                encodedMessage += (encodeURIComponent(p.outerHTML));
                encodedMessage += 'TEAM_BUG';
            }
        })
        a.forEach(p => {
            if (p.innerHTML.toLowerCase().includes(val.toLowerCase())) {
                encodedMessage += (encodeURIComponent(p.outerHTML));
                encodedMessage += 'TEAM_BUG';
            }
        })
        sessionStorage.setItem('res', encodedMessage);
        window.location.href = "./search.html";
    })
})


    // =============================== club details sliding logic  ==============================
    //   Initialize Swiper
var swiper;

function autosliding() {
    swiper = new Swiper(".my_Swiper", {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 30,
        speed: 1000,
        autoplay: {
            delay: 2000,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            750: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1246: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
        },
    });

}
autosliding();

document.querySelector('.my_Swiper').addEventListener('mouseover', () => {
    swiper.autoplay.stop();
});

document.querySelector('.my_Swiper').addEventListener('mouseout', () => {
    swiper.autoplay.start();
});