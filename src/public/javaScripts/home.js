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

function getInnerHtmlForBulletin(val) {
    let str =
        `
    <div class="swiper-slide">
        <div id="bulletin">
        <h2>${val.heading}</h2>
        <p>${val.content}</p>
    </div>
        <img src="./assets/bulletinImage/${val.image}.jpg" alt = "${val.image}" decoding="async" loading='eager' id='makeBlur'>
        <img src="./assets/bulletinImage/${val.image}.jpg" alt = "${val.image}" decoding="async" loading='lazy' class="mainImg1">
        <img src="./assets/bulletinImage/${val.image}.jpg" alt = "${val.image}" decoding="async" loading='lazy' class="mainImg2">
        <img src="./assets/bulletinImage/${val.image}.jpg" alt = "${val.image}" decoding="async" loading='lazy' class="mainImg3">
        
        `;
    return str;
}

const displayDynamicInfo = function (res) {
    res.forEach((val, idx) => {
        if (idx == 0) {
            swiperWrapper1.innerHTML = `${getInnerHtmlForBulletin(val)}`;
        }
        else {

            let newNode = document.createElement('div');
            newNode.classList.add('swiper-slide');
            newNode.innerHTML = `${getInnerHtmlForBulletin(val)}`;
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
    let res = await fetch('/assets/upcomingEvent/futureEvent.json');
    let data = await res.json();
    data.forEach((val) => {
        let srcImg = "/assets/upcomingEvent/eventImage/" + val.link;
        let newNode = document.createElement('div');
        newNode.classList.add('swiper-slide');
        newNode.innerHTML =
            `
            <img src='${srcImg}' loading='lazy' class="eventBox" decoding="async" alt="Event">
            `;
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
                delay: 3000,
            }
        });
    })
    document.querySelectorAll('.eventBox').forEach(val => {
        val.addEventListener('click', () => {
            window.open("event", '_blank');
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
scrollToTop.addEventListener('click', e => {
    window.scrollTo(0, 0);
})
window.addEventListener('scroll', visibility)
window.addEventListener('load', visibility)

let numbers = document.querySelectorAll('.exp > .blackCover > .content > div > span:first-child');

window.addEventListener('scroll', () => {
    if (elementIsVisibleInViewport(numbers[0], true) || elementIsVisibleInViewport(numbers[numbers.length - 1], true)) {
        numbers.forEach(val => {
            let ans = new Odometer({
                el: val,
                duration: 2500
            });
            ans.update(val.getAttribute('data'));
        });
    }
});

function elementIsVisibleInViewport(el, partiallyVisible = false) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    const verticallyVisible = partiallyVisible
        ? (rect.top < windowHeight && rect.bottom >= 0) || (rect.bottom > 0 && rect.top <= windowHeight)
        : (rect.top >= 0 && rect.bottom <= windowHeight) || (rect.bottom >= 0 && rect.top <= windowHeight);

    const horizontallyVisible = partiallyVisible
        ? (rect.left < windowWidth && rect.right >= 0) || (rect.right > 0 && rect.left <= windowWidth)
        : (rect.left >= 0 && rect.right <= windowWidth) || (rect.right >= 0 && rect.left <= windowWidth);

    return verticallyVisible && horizontallyVisible;
}


//search funcitons
let searches = document.querySelectorAll('.search');
function goSearch(val) {
    if (val == '') return;
    sessionStorage.setItem('res', val);
    window.location.href = "/search";
}
searches.forEach(search => {
    search.childNodes[3].addEventListener('click', () => {
        let val = search.childNodes[1].value.trim();
        goSearch(val);
    })
})
let searchAny = document.querySelectorAll('.search input');
searchAny.forEach(val => {
    val.addEventListener('keydown', e => {
        if (e.keyCode === 13) {
            goSearch(val.value.trim());
        }
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
        1067: {
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
    window.scrollTo(0, 0);
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

    fetch('/assets/aside news/info.json')
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
            deny.classList.add('arrival');
            deny.classList.remove('leave');
            aside.style.display = 'block';
            asideContent.innerHTML = `<img decoding="async" src="/assets/aside news${data.path}" alt="news">`;
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
    deny.classList.add('leave');
    deny.classList.remove('arrival');
})
window.addEventListener('resize', e => {
    if (isAsideOpen) {
        console.log('history');
        requestAnimationFrame(() => {
            body.style.overflowY = "hidden";
            deny.classList.add('arrival');
        })
    }
})

//copy address
let copyAddress = document.querySelector('.copyAddress');
let addressText = document.querySelector('.addressText');
copyAddress.addEventListener('click', () => {
    let text = addressText.textContent;
    navigator.clipboard.writeText(text);
    copyAddress.style.scale = '0';
    setTimeout(() => {
        copyAddress.setAttribute('src', '/assets/images/icons8-double-tick-24.png');
        copyAddress.style.scale = '1';
    }, 100)
})

//announcement section 
const announcementDataContainer = document.querySelector('.second .content .sub-content');
(
    async function () {
        let data = await fetch('/assets/announcementData/announcement.json');
        let dataJson = await data.json();
        dataJson.forEach((item, index) => {
            let boxes = document.createElement('div');
            boxes.classList.add('updateBox');
            if (index == dataJson.length - 1) {
                boxes.innerHTML =
                    ` 
                <a href="${item.link}" target="_blank">
                <p>${item.paragraph}
                    <img src="./assets/video/new.gif" alt="Error" loading="lazy" decoding="async"></img>
                </p>
                </a>
                
                `;
            }
            else {

                boxes.innerHTML =
                    ` 
                <a href="${item.link}" target="_blank">
                <p>${item.paragraph}</p>
                </a>
                
                `;
            }
            announcementDataContainer.prepend(boxes);
        })
    }
)()