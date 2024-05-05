let box = document.querySelector('.onOrOff');
let p = document.querySelector('.onOrOff p');
window.addEventListener('load', function (e) {
    if (!navigator.onLine) {
        box.style.transform = "translate(-50%,20%)";
        p.innerHTML = "Poor Connection!!";
        setTimeout(() => {
            box.style.transform = "translate(-50%,-120%)";
        }, 3000);
    }
}, false);
window.addEventListener('online', function (e) {
    p.innerHTML = "Welcome Back !!";
    box.style.transform = "translate(-50%,20%)";
    setTimeout(() => {
        box.style.transform = "translate(-50%,-120%)";
    }, 3000);
}, false);

window.addEventListener('offline', function (e) {
    box.style.transform = "translate(-50%,20%)";
    p.innerHTML = "Poor Connection!!";
    setTimeout(() => {
        box.style.transform = "translate(-50%,-120%)";
    }, 3000);
}, false);
