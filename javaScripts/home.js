let first = document.querySelector('.first');
let bulletin = document.querySelector('#bulletin');
let bulletinH2 = document.querySelector('#bulletin h2');
let bulletinP = document.querySelector('#bulletin p');
let blackCover = document.querySelector('.black-cover');
let loadingPage = document.querySelector('.loadingPage');
let welcomeAotImg = document.querySelector('.loadingPage img');
let pArrow = document.querySelector('.prev-arrow');
let nArrow = document.querySelector('.next-arrow');
let eventInfo;
let idxDynamicInfo = 0;
let counter = 0;
let refInterval;
let images = document.querySelectorAll('.slide');
let lessImages = ['./assets/bulletinImage/first.webp', './assets/bulletinImage/second.webp', './assets/bulletinImage/third.webp', './assets/bulletinImage/fourth.webp', './assets/bulletinImage/fifth.webp', './assets/bulletinImage/sixth.webp', './assets/bulletinImage/seventh.webp', './assets/bulletinImage/eighth.webp', './assets/bulletinImage/ninth.webp'];
let bigImages = ['./assets/bulletinImage/firstBig.webp', './assets/bulletinImage/secondBig.webp', './assets/bulletinImage/thirdBig.webp', './assets/bulletinImage/fourthBig.webp', './assets/bulletinImage/fifthBig.webp', './assets/bulletinImage/sixthBig.webp', './assets/bulletinImage/seventhBig.webp', './assets/bulletinImage/eighthBig.webp', './assets/bulletinImage/ninthBig.webp'];

//functions
const displayDynamicInfo = function (head, text) {  //function to write html elements
    bulletin.innerHTML =
        `
            <h2>${head}</h2>
            <P>${text}</P>
        `;
};
images.forEach((val, idx) => {
    val.style.left = `${idx * 100}%`;
})
let slide = () => {
    images.forEach((val, idx) => {
        val.style.transform = `translateX(-${counter * 100}%)`;
    })
}
async function getDynamicData() {   //use to fetch json data from bulletinInfo folder
    let res = await fetch('./assets/bulletinInfo/bulletinInfo.json');
    let text = await res.json();
    eventInfo = text;
    console.log(eventInfo);
};

let changeDynamicInfo = () => { //function to change json info in bulletin section
    refInterval = setInterval(() => {
        idxDynamicInfo = (idxDynamicInfo + 1) % eventInfo.length;
        const data = eventInfo[idxDynamicInfo];
        bulletin.style.animation = "move2 1.2s ease forwards;"
        displayDynamicInfo(data.heading, data.content);
        counter = (counter + 1) % images.length;
        slide();
    }, 5000);
};

//events
window.addEventListener('resize', () => {
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
})
nArrow.addEventListener('click', e => {
    clearInterval(refInterval);
    idxDynamicInfo = (idxDynamicInfo + 1) % eventInfo.length;
    const data = eventInfo[idxDynamicInfo];
    displayDynamicInfo(data.heading, data.content);
    counter = (counter + 1) % images.length;
    slide();
    changeDynamicInfo();
})
pArrow.addEventListener('click', e => {
    clearInterval(refInterval);
    idxDynamicInfo--;
    if (idxDynamicInfo < 0) idxDynamicInfo = eventInfo.length - 1;
    const data = eventInfo[idxDynamicInfo];
    displayDynamicInfo(data.heading, data.content);
    counter--;
    if (counter < 0) counter = images.length - 1;
    slide();
    changeDynamicInfo();
})


//main content
getDynamicData().then(() => {
    const data = eventInfo[idxDynamicInfo];
    displayDynamicInfo(data.heading, data.content);
    idxDynamicInfo++;
});

body.style.overflow = "hidden";
if (!sessionStorage.getItem('loadingPage')) {
    sessionStorage.setItem('loadingPage', 'true');
    setTimeout(() => {
        loadingPage.style.scale = "40";
        welcomeAotImg.style.filter = "invert(100%) opacity(0%)";
        loadingPage.style.backgroundColor = "rgb(0,0,0,0)";
        setTimeout(() => {
            loadingPage.style.zIndex = "-10";
            body.style.overflow = "auto";
        }, 1000);
    }, 2000);
}
else {
    body.style.overflow = "auto";
    loadingPage.style.display = "none";
}
changeDynamicInfo();
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