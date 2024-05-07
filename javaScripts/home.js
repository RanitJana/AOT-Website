let loadingPage = document.querySelector('.loadingPage');
let welcomeAotImg = document.querySelector('.loadingPage img');
let swiperWrapper1 = document.querySelector('.mySwiper1 .swiper-wrapper');

function loadImg(actualImage, blurImage) {
    var img = new Image();
    img.onload = function () {
        actualImage.src = this.src;
        actualImage.classList.remove("hidden");
        blurImage.classList.add("hidden");
    };
    img.src = actualImage.src;
}

const displayDynamicInfo = function (res) {
    res.forEach((val, idx) => {
        if (idx == 0) {
            swiperWrapper1.innerHTML =
                `
                <div class="swiper-slide">
                    <div id="bulletin">
                    <h2>${val.heading}</h2>
                    <p>${val.content}</p>
                </div>
                <img src="./assets/bulletinImage/${val.image}" alt = "${val.image}" decoding="async" id='makeBlur'>
                <img src="./assets/bulletinImage/${val.image}" alt = "${val.image}" decoding="async" class='mainImg1'>
                <img src="./assets/bulletinImage/${val.image}" alt = "${val.image}" decoding="async" class='mainImg2'>
                <img src="./assets/bulletinImage/${val.image}" alt = "${val.image}" decoding="async" class='mainImg3'>
                </div>
            `;
        }
        else {

            let newNode = document.createElement('div');
            newNode.classList.add('swiper-slide');
            newNode.innerHTML =
                `
            <div id="bulletin">
                <h2>${val.heading}</h2>
                <p>${val.content}</p>
            </div>
            <img src="./assets/bulletinImage/${val.image}" alt = "${val.image}" decoding="async" id='makeBlur'>
            <img src="./assets/bulletinImage/${val.image}" alt = "${val.image}" decoding="async" class='mainImg1'>
            <img src="./assets/bulletinImage/${val.image}" alt = "${val.image}" decoding="async" class='mainImg2' id='mid'>
            <img src="./assets/bulletinImage/${val.image}" alt = "${val.image}" decoding="async" class='mainImg3'>
            `;
            swiperWrapper1.appendChild(newNode);
        }
    })
    requestAnimationFrame(() => {
        var swiper1 = new Swiper(".mySwiper1", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 900,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 6000,
            },
            on: {
                slideChange: function () {
                    // Get active slide
                    var activeSlide = this.slides[this.activeIndex];
                    // Find the element with class animate-on-slide inside the active slide
                    var animatedElement1 = activeSlide.querySelector('#bulletin h2');
                    var animatedElement2 = activeSlide.querySelector('#bulletin p');
                    var midImg = activeSlide.querySelectorAll('img');
                    // Add active class to trigger animation
                    animatedElement1.classList.add('fromTop');
                    animatedElement2.classList.add('fromRight');
                    midImg.forEach((val, idx) => {
                        if (idx != 0)
                            val.classList.add('increase');
                    })
                },
                slideChangeTransitionEnd: function () {
                    // Reset animation after transition ends
                    var previousSlide = this.slides[this.previousIndex];
                    var animatedElement1 = previousSlide.querySelector('#bulletin h2');
                    var animatedElement2 = previousSlide.querySelector('#bulletin p');
                    var midImg = previousSlide.querySelectorAll('img');

                    animatedElement1.classList.remove('fromTop');
                    animatedElement2.classList.remove('fromRight');
                    midImg.forEach((val, idx) => {
                        if (idx != 0)
                            val.classList.remove('increase');
                    })
                },
            },
        });
    });
};

async function getDynamicData() {   //use to fetch json data from bulletinInfo folder
    let res = await fetch('./assets/bulletinInfo/bulletinInfo.json');
    let text = await res.json();
    return text;
};

//main content
getDynamicData()
    .then((res) => {
        displayDynamicInfo(res);
    }).catch(err => {
        console.log(err);
    })

//announcement section

function announceSeeMore() {
    let announcementOverflow = document.querySelector('main>.secondParSec .second>.content');
    let seeMoreAccoune = document.querySelector('.seeMore');
    seeMoreAccoune.addEventListener('click', () => {
        seeMoreAccoune.style.display = "none";
        announcementOverflow.style.overflow = "auto";
    })
}
announceSeeMore();

//iframe on click
let serveIframe = `<iframe src="https://www.youtube.com/embed/O_u78qBmUuo?autoplay=1&si=E3a7O0nt0ZSiUvjM&amp;start=8"
loading="lazy" title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`;
let savedIframe = `<iframe title="null"></iframe>
<img src="./assets/images/icons8-youtube-96.png" alt="">
`;

let parentIframe = document.querySelector('.video');
let playIframe = document.querySelector('#youtube');
playIframe.addEventListener('click', () => {
    parentIframe.innerHTML = `${serveIframe}`;

})

//event slider
let secondSwiper = document.querySelector('.mySwiper2 .swiper-wrapper');
async function getFutureEventData() {
    let res = await fetch('../assets/upcomingEvent/futureEvent.json');
    let data = await res.json();
    data.forEach((val) => {
        let h3 = val.eventName, span = val.shortInfo, srcImg = "../assets/upcomingEvent/eventImage/" + val.link;
        let newNode = document.createElement('div');
        newNode.classList.add('swiper-slide');
        newNode.innerHTML =
            `
            <div class="eventBox">
                <div class="writingContent">
                    <h3>${h3}</h3>
                    <p>${span}</p>
                </div>
            </div>
         `;
        newNode.childNodes[1].style.background = `url('${srcImg}') center no-repeat`;
        newNode.childNodes[1].style.backgroundSize = "cover";
        secondSwiper.appendChild(newNode);
    })
}
getFutureEventData().then(() => {
    requestAnimationFrame(() => {
        var swiper2 = new Swiper(".mySwiper2", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 500,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 2000,
            },
        });
    })
    document.querySelectorAll('.eventBox').forEach(val => {
        val.addEventListener('click', () => {
            window.open("./pages/event.html", '_blank');
        });
    })
})




//scroll to top
let scrollToTop = document.querySelector('.scrollTo');
function visibility() {
    if (Math.floor(window.scrollY) >= 190) {
        scrollToTop.style.scale = '1';
    }
    else {
        scrollToTop.style.scale = '0';
    }
}
window.addEventListener('scroll', visibility)
window.addEventListener('load', visibility)

//display faculty members numbers
const elementIsVisibleInViewport = (el,) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return (top > 0 && top < innerHeight + 200) || (bottom > 0 && bottom < innerHeight - 200);
};

let numbers = document.querySelectorAll('.exp>.blackCover>.content>div');
let exp = document.querySelector('.exp');
let again = false;
window.addEventListener('scroll', (e) => {
    if (elementIsVisibleInViewport(exp, true) && !again) {
        again = true
        numbers.forEach(value => {
            value.childNodes[0].textContent = 0;
            let count = 0;
            function updateCount() {
                const target = parseInt(value.getAttribute('data'));
                if (count < target) {
                    count += parseInt(target / 100);
                    if (count >= target) count = target;
                    value.childNodes[0].textContent = count + '+';
                    setTimeout(updateCount, 40);
                }
                else {
                    value.childNodes[0].textContent = target + '+';
                }
            }
            updateCount();
        })
    }
})

//search funcitons
let searches = document.querySelectorAll('.search');
let para = document.querySelectorAll('p');
let h2 = document.querySelectorAll('h2');
let a = document.querySelectorAll('a');
let section = document.querySelectorAll('section');
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
                let newNode = p;
                newNode.setAttribute('href', '.' + newNode.getAttribute('href').slice(7));
                encodedMessage += (encodeURIComponent(newNode.outerHTML));
                encodedMessage += 'TEAM_BUG';
            }
        })
        sessionStorage.setItem('res', encodedMessage);
        window.location.href = "./pages/search.html";
    })
})

let swiper3 = new Swiper(".mySwiper3", {
    slidesPerView: 1,
    spaceBetween: 3,
    loop: true,
    speed: 500,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 3000,
    },
    breakpoints: {
        // when window width is <= 1000px
        1065: {
            slidesPerView: 2, // Change to 1 slide per view
        }
    },
});

let isAsideOpen = false;
let aside = document.querySelector('aside');
let asideContent = document.querySelector('aside>.content');

body.style.overflow = "hidden";
if (!sessionStorage.getItem('loadingPage')) {
    sessionStorage.setItem('loadingPage', 'true');
    setTimeout(() => {
        requestAnimationFrame(() => {
            loadingPage.style.scale = "40";
            welcomeAotImg.style.filter = "invert(100%) opacity(0%)";
            loadingPage.style.backgroundColor = "rgb(0,0,0,0)";
            setTimeout(() => {
                loadingPage.style.zIndex = "-10";
            }, 500);
        })
    }, 1000);

    fetch('../assets/aside news/info.json')
        .then(res => {
            if (!res) {
                aside.style.display = 'none';
                return;
            }
            return res.json();
        })
        .then(data => {
            isAsideOpen = true;
            body.style.overflowY = "hidden";
            deny.style.right = '0%';
            deny.style.backgroundColor = "rgba(0, 0, 0, 0.649)";
            aside.style.display = 'block';
            asideContent.innerHTML = `<img decoding="async" src="../assets/aside news${data.path}" alt="">`;
        })
        .catch(err => console.log(err));
}
else {
    body.style.overflow = "auto";
    loadingPage.style.display = "none";
}

document.querySelector('aside >img').addEventListener('click', e => {
    isAsideOpen = false;
    aside.style.animation = "vanish 0.3s linear forwards";
    body.style.overflowY = "auto";
    deny.style.right = '-100%';
    deny.style.backgroundColor = "transparent";
})
window.addEventListener('resize', e => {
    if (isAsideOpen) {
        console.log('history');
        requestAnimationFrame(() => {
            body.style.overflowY = "hidden";
            deny.style.right = '0%';
            deny.style.backgroundColor = "rgba(0, 0, 0, 0.649)";
        })
    }
})