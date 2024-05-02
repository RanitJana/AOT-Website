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