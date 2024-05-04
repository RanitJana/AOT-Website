let first = document.querySelector('.first');
let loadingPage = document.querySelector('.loadingPage');
let welcomeAotImg = document.querySelector('.loadingPage img');
let pArrow = document.querySelector('.swiper-button-prev');
let nArrow = document.querySelector('.swiper-button-next');
let images = document.querySelectorAll('.slide');
let eventInfo;
let refInterval = null;
let bulletinh2 = document.querySelector('#bulletin>h2');
let bulletinp = document.querySelector('#bulletin>p');
let bulletinimg = document.querySelector('#bulletin + img');
let swiperImage = document.querySelector('.swiper-wrapper');

const displayDynamicInfo = function (res) {
    res.forEach((val, idx) => {
        if (idx == 0) {
            bulletinh2.textContent = val.heading;
            bulletinp.textContent = val.content;
            bulletinimg.setAttribute('src', val.image + '.webp');
            bulletinimg.setAttribute('alt', val.image + '.jpg');
        }
        else {
            let newNode = document.createElement('div');
            newNode.classList.add('swiper-slide');
            newNode.innerHTML =
                `
            <div href="" id="bulletin">
            <h2>${val.heading}</h2>
            <p>${val.content}</p>
            </div>
            <img src="${val.image + '.webp'}" class="slide" alt="${val.image + '.jpg'}" loading="eager">
            `;
            swiperImage.appendChild(newNode);
        }
    })
    requestAnimationFrame(() => {
        var swiper = new Swiper(".mySwiper", {
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
                body.style.overflow = "auto";
            }, 500);
        })
    }, 1000);
}
else {
    body.style.overflow = "auto";
    loadingPage.style.display = "none";
}

//announcement section

function announceSeeMore() {
    let announcementOverflow = document.querySelector('main>.content .second>.content');
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
let eventContainer = document.querySelector('.eventContainer');
async function getFutureEventData() {
    let res = await fetch('../assets/upcomingEvent/futureEvent.json');
    let data = await res.json();
    data.forEach((val) => {
        let h3 = val.eventName, span = val.shortInfo, srcImg = val.link;
        let newNode = document.createElement('div');
        newNode.classList.add('eventPar');
        newNode.innerHTML =
            `
            <div class="eventInfo">
                <div class="writingContent">
                    <h3>${h3}</h3>
                    <span>${span}</span>
                </div>
            </div>
        `;
        newNode.childNodes[1].style.background = `url('${srcImg}') center no-repeat`;
        newNode.childNodes[1].style.backgroundSize = "cover";
        eventContainer.appendChild(newNode);
    })
}
getFutureEventData().then(() => {
    let eventPar = document.querySelectorAll('.eventPar');
    eventPar.forEach((val, idx) => {
        val.style.left = `${idx * 100}%`;
    })
    let counter = 0;
    let rightMove = true;
    requestAnimationFrame(() => {
        setInterval(() => {
            if (rightMove) {
                if (counter == eventPar.length - 1) {
                    rightMove = false;
                    eventPar.forEach((val, idx) => {
                        val.style.transform = `translateX(-${counter * 100}%)`;
                    })
                    counter--;
                }
                else {
                    eventPar.forEach((val, idx) => {
                        val.style.transform = `translateX(-${counter * 100}%)`;
                    })
                    counter++;
                }
            }
            else {
                if (counter == 0) {
                    rightMove = true;
                    eventPar.forEach((val, idx) => {
                        val.style.transform = `translateX(-${counter * 100}%)`;
                    })
                    counter++;
                }
                else {
                    eventPar.forEach((val, idx) => {
                        val.style.transform = `translateX(-${counter * 100}%)`;
                    })
                    counter--;
                }
            }
        }, 3000);
    })
    document.querySelectorAll('.eventInfo').forEach(val => {
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


//<----     GSAP    ----->

requestAnimationFrame(() => {

    gsap.from('.banner', {
        duration: 1.5,
        opacity: '0',
        scale: 2,
    });
    gsap.from('.parent-nav', {
        x: 500,
        opacity: '0',
        duration: 1.5,
        scrollTrigger: ".parent-nav"
    })
    gsap.from('section .first', {
        opacity: '0',
        x: -500,
        duration: 1.5,
        scrollTrigger: "section .first"
    })
    gsap.from('.online', {
        opacity: '0',
        x: -500,
        duration: 1.5,
        scrollTrigger: ".online"
    })
    gsap.from('.enquiry', {
        opacity: '0',
        x: 500,
        duration: 1.5,
        scrollTrigger: '.enquiry'
    })
    gsap.from('.third', {
        opacity: '0',
        x: 500,
        duration: 1.5,
        scrollTrigger: ".third"
    })
    gsap.from('.event', {
        opacity: '0',
        x: -500,
        duration: 1.5,
        scrollTrigger: ".event"
    })
    gsap.from('.second', {
        opacity: '0',
        x: 500,
        duration: 1.5,
        scrollTrigger: ".second"
    })
    gsap.from('.exp', {
        opacity: '0',
        x: -500,
        duration: 1.5,
        scrollTrigger: ".exp"
    })
    gsap.from('.allignments', {
        opacity: '0',
        x: 500,
        duration: 1.5,
        scrollTrigger: ".allignments"
    })
    gsap.from('.fourth', {
        opacity: '0',
        x: -500,
        duration: 1.5,
        scrollTrigger: ".fourth"
    })
    let ranks = document.querySelectorAll('.fourth .rankInfo');
    let opp = -1;
    ranks.forEach(val => {
        gsap.from(val, {
            opacity: '0',
            x: -500 * opp,
            duration: 1.5,
            scrollTrigger: val
        })
        opp *= -1;
    })
    gsap.from('.seventh', {
        opacity: '0',
        x: -500,
        duration: 1.5,
        scrollTrigger: ".seventh"
    })
    gsap.from('.eighth', {
        opacity: '0',
        x: 500,
        duration: 1.5,
        scrollTrigger: ".eighth"
    })
    gsap.from('.glance', {
        opacity: '0',
        scale: 2,
        duration: 1.5,
        scrollTrigger: ".glance"
    })
    gsap.from('.antiRagging', {
        opacity: '0',
        x: -500,
        duration: 1.5,
        scrollTrigger: ".antiRagging"
    })
    gsap.from('.workshop', {
        opacity: '0',
        x: 500,
        duration: 1.5,
        scrollTrigger: ".workshop"
    })
    gsap.from('.ninth', {
        opacity: '0',
        x: -500,
        duration: 1.5,
        scrollTrigger: ".ninth"
    })
    gsap.from('.ninth iframe', {
        opacity: '0',
        scale: 2,
        duration: 1.5,
        scrollTrigger: ".ninth iframe"
    })
});