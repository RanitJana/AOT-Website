// bulletin section
let heading = document.querySelector('#bulletin h2');
let para = document.querySelector('#bulletin p');
let first = document.querySelector('.first');
let eventInfo;
let idx = 0;
let idxImg = 1;
let refInterval;
let images = ['../assets/bulletinImage/first.jpeg', '../assets/bulletinImage/second.jpeg', '../assets/bulletinImage/third.jpeg', '../assets/bulletinImage/fourth.jpeg', '../assets/bulletinImage/fifth.jpeg', '../assets/bulletinImage/sixth.jpeg', '../assets/bulletinImage/seventh.jpeg', '../assets/bulletinImage/eighth.jpeg', '../assets/bulletinImage/ninth.jpeg'];




//functions
const creation = function (head, text) {
    heading.innerHTML = `${head}`;
    para.innerHTML = `${text}`;
};


async function getData() {
    let res = await fetch('../assets/bulletinInfo/bulletinInfo.json');
    let text = await res.json();
    eventInfo = text;
    console.log(eventInfo);
}
getData().then(() => {
    const data = eventInfo[idx];
    creation(data.heading, data.content);
    idx++;
});

let calInterval = () => {
    refInterval = setInterval(() => {
        const data = eventInfo[idx];
        creation(data.heading, data.content);
        idx++;
        if (idx >= eventInfo.length) idx = 0;
        first.style.backgroundImage = `url('${images[idxImg]}')`;
        idxImg++;
        if (idxImg > images.length - 1) idxImg = 0;
    }, 3000);
}

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

//preload images
preloadImages(images)
    .then((image) => {
        calInterval();
    })
    .catch((error) => {
        console.error("Failed to preload images:", error);
    });
let pArrow = document.querySelector('.prev-arrow'), nArrow = document.querySelector('.next-arrow');


//events
nArrow.addEventListener('click', e => {
    idx++;
    if (idx >= eventInfo.length) idx = 0;
    const data = eventInfo[idx];
    idxImg++;
    if (idxImg > images.length - 1) idxImg = 0;
    first.style.backgroundImage = `url('${images[idxImg]}')`;
    creation(data.heading, data.content);
    clearInterval(refInterval);
    calInterval();
})
pArrow.addEventListener('click', e => {
    idx--;
    if (idx < 0) idx = eventInfo.length - 1;
    const data = eventInfo[idx];
    idxImg--;
    if (idxImg < 0) idxImg = images.length - 1;
    first.style.backgroundImage = `url('${images[idxImg]}')`;
    creation(data.heading, data.content);
    clearInterval(refInterval);
    calInterval();
})