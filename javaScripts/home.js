let first = document.querySelector('.first'),
    newsBox = document.querySelector('.newsBox'),
    blackCover = document.querySelector('.black-cover'),
    loadingPage = document.querySelector('.loadingPage'),
    welcomeAotImg = document.querySelector('.loadingPage img'),
    eventInfo,
    idx = 0,
    idxImg = 5,
    refInterval,
    images = ['../assets/bulletinImage/first.webp', '../assets/bulletinImage/second.webp', '../assets/bulletinImage/third.webp', '../assets/bulletinImage/fourth.webp', '../assets/bulletinImage/fifth.webp', '../assets/bulletinImage/sixth.webp', '../assets/bulletinImage/seventh.webp', '../assets/bulletinImage/eighth.webp', '../assets/bulletinImage/ninth.webp'];

function imageSlider() {
    // // bulletin section
    //functions
    const creation = function (head, text) {
        newsBox.innerHTML =
            `
<a href="" id="bulletin">
    <h2>${head}</h2>
    <P>${text}</P>
</a>
`;
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
            blackCover.style.backgroundImage = `url('${images[idxImg]}')`;
        }, 4000);
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
        creation(data.heading, data.content);
        first.style.backgroundImage = `url('${images[idxImg]}')`;
        idxImg++;
        if (idxImg > images.length - 1) idxImg = 0;
        blackCover.style.backgroundImage = `url('${images[idxImg]}')`;
        clearInterval(refInterval);
        calInterval();
    })
    pArrow.addEventListener('click', e => {
        idx--;
        if (idx < 0) idx = eventInfo.length - 1;
        const data = eventInfo[idx];
        creation(data.heading, data.content);
        first.style.backgroundImage = `url('${images[idxImg]}')`;
        idxImg--;
        if (idxImg < 0) idxImg = images.length - 1;
        blackCover.style.backgroundImage = `url('${images[idxImg]}')`;
        clearInterval(refInterval);
        calInterval();
    })
}
function announceSeeMore() {
    let announcementOverflow = document.querySelector('main>.content .second>.content');
    let seeMoreAccoune = document.querySelector('.seeMore');
    seeMoreAccoune.addEventListener('click', () => {
        seeMoreAccoune.style.display = "none";
        announcementOverflow.style.overflow = "auto";
    })
}
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
        imageSlider();
        announceSeeMore();
    }, 2000);
}
else {
    body.style.overflow = "auto";
    loadingPage.style.display = "none";
    sessionStorage.removeItem('loadingPage');
    imageSlider();
    announceSeeMore();
}
