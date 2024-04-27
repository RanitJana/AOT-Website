let container = document.querySelectorAll('.item-container');
container.forEach(val => {
    val.addEventListener('mouseleave', e => {
        // val.scrollTop = 0;
        const scrollDuration = 500;
        const scrollStep = val.scrollTop / (scrollDuration / 15);

        const scrollInterval = setInterval(() => {
            if (val.scrollTop != 0) {
                val.scrollTop -= scrollStep;
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    })
})