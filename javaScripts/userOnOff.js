let box = document.querySelector('.onOrOff');
let p = document.querySelector('.onOrOff p');
let boxImg = document.querySelector('.onOrOff img');
window.addEventListener('load', function (e) {
    if (!navigator.onLine) {
        box.style.backgroundColor = "rgb(255, 106, 106)";
        boxImg.setAttribute('src', "./assets/images/icons8-no-connection.gif")
        p.innerHTML = "Poor Connection!!";
        box.style.transform = "translate(-50%,20%)";
        setTimeout(() => {
            box.style.transform = "translate(-50%,-120%)";
        }, 3000);
    }
}, false);
window.addEventListener('online', function (e) {
    box.style.backgroundColor = "rgb(81, 254, 81)";
    boxImg.setAttribute('src', "./assets/images/icons8-online.gif")
    p.innerHTML = "Welcome Back !!";
    box.style.transform = "translate(-50%,20%)";
    setTimeout(() => {
        box.style.transform = "translate(-50%,-120%)";
    }, 3000);
}, false);

window.addEventListener('offline', function (e) {
    box.style.backgroundColor = "rgb(255, 106, 106)";
    boxImg.setAttribute('src', "./assets/images/icons8-no-connection.gif")
    p.innerHTML = "Poor Connection!!";
    box.style.transform = "translate(-50%,20%)";
    setTimeout(() => {
        box.style.transform = "translate(-50%,-120%)";
    }, 3000);
}, false);
