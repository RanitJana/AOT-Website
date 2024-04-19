let first = document.querySelector('.first'),
    bulletin = document.querySelector('#bulletin'),
    blackCover = document.querySelector('.black-cover'),
    loadingPage = document.querySelector('.loadingPage'),
    welcomeAotImg = document.querySelector('.loadingPage img'),
    eventInfo,
    idx = 0,
    refInterval
let pArrow = document.querySelector('.prev-arrow'), nArrow = document.querySelector('.next-arrow');
//functions
const creation = function (head, text) {
    bulletin.innerHTML =
        `
    <h2>${head}</h2>
    <P>${text}</P>
`;
};
async function getData() {
    let res = await fetch('../assets/bulletinInfo/bulletinInfo.json');
    let text = await res.json();
    eventInfo = text;
    console.log(eventInfo);
};
getData().then(() => {
    const data = eventInfo[idx];
    creation(data.heading, data.content);
    idx++;
});

let calInterval = () => {
    refInterval = setInterval(() => {
        idx++;
        if (idx >= eventInfo.length) idx = 0;
        const data = eventInfo[idx];
        creation(data.heading, data.content);
    }, 5000);
};

//events
nArrow.addEventListener('click', e => {
    idx++;
    if (idx >= eventInfo.length) idx = 0;
    const data = eventInfo[idx];
    creation(data.heading, data.content);
    clearInterval(refInterval);
    calInterval();
})
pArrow.addEventListener('click', e => {
    idx--;
    if (idx < 0) idx = eventInfo.length - 1;
    const data = eventInfo[idx];
    creation(data.heading, data.content);
    clearInterval(refInterval);
    calInterval();
})

function announceSeeMore() {
    let announcementOverflow = document.querySelector('main>.content .second>.content');
    let seeMoreAccoune = document.querySelector('.seeMore');
    seeMoreAccoune.addEventListener('click', () => {
        seeMoreAccoune.style.display = "none";
        announcementOverflow.style.overflow = "auto";
    })
}

//main content
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
calInterval();
announceSeeMore();
