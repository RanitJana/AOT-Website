const toTopbtn=document.querySelector('.to-top');


window.addEventListener('scroll',()=>{
    if(window.scrollY>100){
        toTopbtn.style.scale=1;
    }
    else{ 
        toTopbtn.style.scale=0;
    }
});