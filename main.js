const cursor = document.querySelector(".cursor");







window.addEventListener('mousemove', (e) => {
    const x = e.clientX - cursor.offsetWidth / 2;
    const y = e.clientY - cursor.offsetHeight / 2;

    animateTrailer(e);
})


let animateTrailer = (e) => {
    const x = e.clientX - cursor.offsetWidth / 2;
    const y = e.clientY - cursor.offsetHeight / 2;

    console.log(`${x}px,${y}px`)


    // make the mouse trailer lag a bit behind the cursor
    // creating an keyframes object
    const keyframes = {
        transform:`translate(${x}px , ${y}px)`
    }

    cursor.animate(keyframes,{
        duration: 700, // duration in mili seconds
        fill: "forwards" // starts back from the last ending point
    });
}

