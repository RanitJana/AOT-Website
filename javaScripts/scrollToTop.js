const toTopbtn=document.querySelector('.to-top');


window.addEventListener('scroll',()=>{
    if(window.scrollY>100){
        toTopbtn.classList.add("active-btn");
    }
    else{
        toTopbtn.classList.add('deactive-btn')
        toTopbtn.classList.remove('active-btn')  
    }
});