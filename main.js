const cursor = document.querySelector(".cursor");







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

