const cursor = document.querySelector(".cursor");



window.addEventListener("DOMContentLoaded", () => {
    firstHeadingAnimation();
    promotionAnimation();
})



window.addEventListener('mousemove', (e) => {
    const x = e.clientX - cursor.offsetWidth / 2;
    const y = e.clientY - cursor.offsetHeight / 2;
    let interactable = e.target.closest(".interactable");
    const interacting = interactable !== null; // boolean that returns true if interacting else false
    console.log(`interacting: ${interacting}`);


    if (interacting) {
        const data = interactable.dataset.type;
        if (data == "product") {
            console.log("product");
            cursor.textContent = "click";
        }
    }
    else {
        cursor.textContent = "";
    }

    animateTrailer(e, interacting);
})


let animateTrailer = (e, interacting) => {
    const x = e.clientX - cursor.offsetWidth / 2;
    const y = e.clientY - cursor.offsetHeight / 2;

    console.log(`${x}px,${y}px`)


    // make the mouse trailer lag a bit behind the cursor
    // creating an keyframes object
    const keyframes = {
        transform: `translate(${x}px , ${y}px) scale(${(interacting) ? 5 : 1})`
    }

    cursor.animate(keyframes, {
        duration: 700, // duration in mili seconds
        fill: "forwards" // starts back from the last ending point
    });


}

function firstHeadingAnimation() {
    gsap.from(".first-section_heading", {
        y: 30, // starts from y:30 and ends at the current position
        opacity: 0, // it starts from opacity 0 and ends at 1(current opacity)
        duration: 0.8, // the total animation duration
        delay: 0.5, // before the start of the animation there will be a 0.5 second delay
        stagger: 0.2 // delay of 0.2s between each element under the animation
    });
}

function promotionAnimation() {
    gsap.from(".first-section_promotion-container", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay:1.0,
        scale:0.8
    });
}



// locomotive scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});