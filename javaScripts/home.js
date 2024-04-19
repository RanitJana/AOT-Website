let first = document.querySelector('.first');
let bulletin = document.querySelector('#bulletin');
let blackCover = document.querySelector('.black-cover');
let loadingPage = document.querySelector('.loadingPage');
let welcomeAotImg = document.querySelector('.loadingPage img');
let pArrow = document.querySelector('.prev-arrow');
let nArrow = document.querySelector('.next-arrow');
let eventInfo;
let idxDynamicInfo = 0;
let idxImg = 5;
let refInterval;
let imagesMobile = ['../assets/bulletinImage/first.webp', '../assets/bulletinImage/second.webp', '../assets/bulletinImage/third.webp', '../assets/bulletinImage/fourth.webp', '../assets/bulletinImage/fifth.webp', '../assets/bulletinImage/sixth.webp', '../assets/bulletinImage/seventh.webp', '../assets/bulletinImage/eighth.webp', '../assets/bulletinImage/ninth.webp'];
let imagesDesktop = ['../assets/bulletinImage/firstBig.webp', '../assets/bulletinImage/secondBig.webp', '../assets/bulletinImage/thirdBig.webp', '../assets/bulletinImage/fourthBig.webp', '../assets/bulletinImage/fifthBig.webp', '../assets/bulletinImage/sixthBig.webp', '../assets/bulletinImage/seventhBig.webp', '../assets/bulletinImage/eighthBig.webp', '../assets/bulletinImage/ninthBig.webp'];


let systemImage = screen.width > 480 ? imagesDesktop : imagesMobile;


//functions
const displayDynamicInfo = function (head, text) {  //function to write html elements
    bulletin.innerHTML =
        `
    <h2>${head}</h2>
    <P>${text}</P>
`;
};
async function getDynamicData() {   //use to fetch json data from bulletinInfo folder
    let res = await fetch('../assets/bulletinInfo/bulletinInfo.json');
    let text = await res.json();
    eventInfo = text;
    console.log(eventInfo);
};

let changeDynamicPictures = () => { //function to change pictures in bulletin section
    first.style.backgroundImage = `url('${systemImage[idxImg]}')`;
    idxImg = (idxImg + 1) % systemImage.length;
    blackCover.style.backgroundImage = `url('${systemImage[idxImg]}')`;
}
let changeDynamicInfo = () => { //function to change json info in bulletin section
    refInterval = setInterval(() => {
        idxDynamicInfo = (idxDynamicInfo + 1) % eventInfo.length;
        const data = eventInfo[idxDynamicInfo];
        displayDynamicInfo(data.heading, data.content);
        changeDynamicPictures();
    }, 5000);
};
//functions to preload images
function imageLoaded(src, alt = '') {
    return new Promise((resolve) => {
        const image = document.createElement('img');
        image.setAttribute('src', src);
        image.setAttribute('alt', alt);
        image.addEventListener('load', () => resolve(image));
    });
}
async function preloadImages(images) {
    const promises = images.map(imageLoaded);
    return await Promise.all(promises);
}


//events
nArrow.addEventListener('click', e => {
    clearInterval(refInterval);
    idxDynamicInfo = (idxDynamicInfo + 1) % eventInfo.length;
    const data = eventInfo[idxDynamicInfo];
    displayDynamicInfo(data.heading, data.content);
    changeDynamicPictures();
    changeDynamicInfo();
})
pArrow.addEventListener('click', e => {
    clearInterval(refInterval);
    idxDynamicInfo--;
    if (idxDynamicInfo < 0) idxDynamicInfo = eventInfo.length - 1;
    const data = eventInfo[idxDynamicInfo];
    displayDynamicInfo(data.heading, data.content);
    changeDynamicPictures();
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

preloadImages(systemImage)
    .then((image) => {
        changeDynamicInfo();
    })
    .catch((error) => {
        console.error("Failed to preload images:", error);
    });

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
let savedIframe = `<iframe></iframe>
<img src="./assets/images/icons8-youtube-96.png" alt="">
`;

let parentIframe = document.querySelector('.video');
let playIframe = document.querySelector('#youtube');
// let pause = document.querySelector('#pause');
playIframe.addEventListener('click', () => {
    parentIframe.innerHTML = `${serveIframe}`;

})
// pause.addEventListener('click', () => {
//     parentIframe.innerHTML = `${savedIframe}`;
// })