const toTopbtn=document.querySelector('.to-top');


window.addEventListener('scroll',()=>{
    if(window.scrollY>100){
        toTopbtn.classList.add("active-btn");
        // console.log("hello");
    }
    else{
        toTopbtn.classList.remove('active-btn')
    }
});