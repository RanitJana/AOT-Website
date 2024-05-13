const toTopbtn=document.querySelector('.to-top');

window.addEventListener('scroll',()=>{
    if(window.scrollY>100){
        toTopbtn.style.scale=1;
    }
    else{ 
        toTopbtn.style.scale=0;
    }
});

//=======================  logic for back button  =============================
const backbtn=document.querySelector('.back-btn');
backbtn.addEventListener('click',()=>window.history.back());

//move sticky to top
let header = document.querySelector('header');
let back = document.querySelector('.beforeIntro');
let stickyMove;

function resetTimeout() {
    back.style.transition = "all 0.5s ease";
    back.style.transform = 'translate(0,0%)';
    clearTimeout(stickyMove);
    stickyMove = setTimeout(() => {
        if (Math.floor(window.scrollY) > Math.floor(header.offsetHeight + back.offsetHeight)) {
            back.style.transform = 'translate(0,-100%)';
        }
    }, 3000);
   // console.log(Math.floor(window.scrollY), Math.floor(header.offsetHeight + back.offsetHeight));
}

window.addEventListener('scroll', resetTimeout);
window.addEventListener('touchstart', resetTimeout);