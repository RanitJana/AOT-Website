//search funcitons
let searches = document.querySelectorAll('.search');
let para = document.querySelectorAll('p');
let a = document.querySelectorAll('a');
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
                encodedMessage += (encodeURIComponent(p.outerHTML));
                encodedMessage += 'TEAM_BUG';
            }
        })
        sessionStorage.setItem('res', encodedMessage);
        window.location.href = "./search.html";
    })
})

let header = document.querySelector('header');
let stickyMove;

function resetTimeout() {
    if (screen.width > 1077) {
        nav.style.transition = "all 0.5s ease";
        nav.style.transform = 'translate(0,0%)';
        clearTimeout(stickyMove);
        stickyMove = setTimeout(() => {
            if (Math.floor(window.scrollY) > Math.floor(header.offsetHeight + nav.offsetHeight)) {

                nav.style.transform = 'translate(0,-100%)';
            }
        }, 3000);
    }
}

window.addEventListener('scroll', resetTimeout);
window.addEventListener('touchstart', resetTimeout);