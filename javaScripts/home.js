//bulletin section
let firstEle = document.querySelector('#bulletin');
let eventInfo;
const creation = function (text) {
    firstEle.innerHTML = `
    <div class="newsBox">
    <a href="">
    ${text}
    </a>
    </div>
    `
};

let idx = 0;
let refInterval;
async function getData() {
    let res = await fetch('../assets/bulletinInfo/bulletinInfo.txt');
    let text = (await res.text()).split('<##next##>');
    eventInfo = text;
}
getData().then(() => {
    creation(eventInfo[idx]);
    idx++;
})

let calInterval = () => {
    refInterval = setInterval(() => {
        creation(eventInfo[idx++])
        if (idx >= eventInfo.length) idx = 0;
    }, 3000);
}
calInterval();
let pArrow = document.querySelector('.prev-arrow'), nArrow = document.querySelector('.next-arrow');

nArrow.addEventListener('click', e => {
    idx++;
    if (idx >= eventInfo.length) idx = 0;
    creation(eventInfo[idx]);
    clearInterval(refInterval);
    calInterval();
})
pArrow.addEventListener('click', e => {
    idx--;
    if (idx < 0) idx = eventInfo.length - 1;
    creation(eventInfo[idx]);
    clearInterval(refInterval);
    calInterval();
})