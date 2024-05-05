function loadImg(actualImage, blurImage) {
    var img = new Image();
    img.onload = function () {
        actualImage.src = this.src;
        actualImage.classList.remove("hidden");
        blurImage.classList.add("hidden");
    };
    img.src = actualImage.src;
}
let workshopBlur = document.querySelector('#workshopBlur');
let workshopMain = document.querySelector('#workshopMain');

workshopBlur.onload = loadImg(workshopMain, workshopBlur);

let placementBlur = document.querySelector('#placementBlur');
let placementMain = document.querySelector('#placementMain');

placementBlur.onload = loadImg(placementMain, placementBlur);