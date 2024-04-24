let first = document.querySelector('.first');
let bulletin = document.querySelectorAll('#bulletin');
let loadingPage = document.querySelector('.loadingPage');
let welcomeAotImg = document.querySelector('.loadingPage img');
let pArrow = document.querySelector('.swiper-button-prev');
let nArrow = document.querySelector('.swiper-button-next');
let images = document.querySelectorAll('.slide');
let eventInfo;
let refInterval = null;
let lessImages = ['./assets/bulletinImage/first.webp', './assets/bulletinImage/second.webp', './assets/bulletinImage/third.webp', './assets/bulletinImage/fourth.webp', './assets/bulletinImage/fifth.webp', './assets/bulletinImage/sixth.webp', './assets/bulletinImage/seventh.webp', './assets/bulletinImage/eighth.webp', './assets/bulletinImage/ninth.webp'];
let bigImages = ['./assets/bulletinImage/firstBig.webp', './assets/bulletinImage/secondBig.webp', './assets/bulletinImage/thirdBig.webp', './assets/bulletinImage/fourthBig.webp', './assets/bulletinImage/fifthBig.webp', './assets/bulletinImage/sixthBig.webp', './assets/bulletinImage/seventhBig.webp', './assets/bulletinImage/eighthBig.webp', './assets/bulletinImage/ninthBig.webp'];

//functions
function imgSize() {
    if (screen.width < 650) {
        images.forEach((val, idx) => {
            val.setAttribute('src', lessImages[idx]);
        })
    }
    else {
        images.forEach((val, idx) => {
            val.setAttribute('src', bigImages[idx]);
        })
    }
}
window.addEventListener('resize', () => {
    imgSize();
});
window.addEventListener('load', () => {
    imgSize();
});
const displayDynamicInfo = function (res) {
    bulletin.forEach((data, idx) => {
        const heading = document.createElement('h2');
        heading.textContent = res[idx % res.length].heading;
        data.appendChild(heading);
        const paragraph = document.createElement('p');
        paragraph.textContent = res[idx % res.length].content;
        data.appendChild(paragraph);
    })
};

async function getDynamicData() {   //use to fetch json data from bulletinInfo folder
    let res = await fetch('./assets/bulletinInfo/bulletinInfo.json');
    let text = await res.json();
    return text;
};
requestAnimationFrame(() => {

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1500,
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
            }, 1000);
        })
    }, 2000);
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
    console.log(data);
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
    console.log(eventContainer);
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