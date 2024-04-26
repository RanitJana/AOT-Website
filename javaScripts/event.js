let container = document.querySelectorAll('.item-container');
container.forEach(val => {
    val.addEventListener('mouseleave', e => {
        val.scrollTop = 0;
    })
})