const pages = document.querySelectorAll(".page");

let isAnimating = false;

pages.forEach((page, index) => {

    let flipped = false;

    page.style.zIndex = pages.length - index;

    function flipPage() {

        if (isAnimating) return;

        isAnimating = true;

        if (!flipped) {

            page.style.transform = "rotateY(-180deg)";
            flipped = true;

            const end = () => {
                page.style.zIndex = index;
                isAnimating = false;
                page.removeEventListener("transitionend", end);
            };

            page.addEventListener("transitionend", end);

        } else {

            page.style.transform = "rotateY(0deg)";
            flipped = false;

            page.style.zIndex = pages.length + index;

            const end = () => {
                page.style.zIndex = pages.length - index;
                isAnimating = false;
                page.removeEventListener("transitionend", end);
            };

            page.addEventListener("transitionend", end);
        }
    }

    // Desktop click
    page.addEventListener("click", flipPage);

    // Mobile swipe
    let startX = 0;

    page.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    page.addEventListener("touchend", (e) => {

        let endX = e.changedTouches[0].clientX;

        let diff = startX - endX;

        if (Math.abs(diff) > 50) {
            flipPage();
        }
    });

});
