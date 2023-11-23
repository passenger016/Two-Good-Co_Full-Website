const cursor = document.querySelector(".cursor");
const menuBtn = document.querySelector(".menu-btn");
const secondaryNav = document.querySelector(".secondary-navbar");
const logo = document.querySelector(".logo");

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
        y: 400, // starts from y:30 and ends at the current position
        opacity: 0, // it starts from opacity 0 and ends at 1(current opacity)
        duration: 0.6, // the total animation duration
        delay: 0.5, // before the start of the animation there will be a 0.5 second delay
        stagger: 0.2 // delay of 0.2s between each element under the animation
    });





}

function promotionAnimation() {
    gsap.from(".first-section_promotion-container", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 1.0,
        scale: 0.8
    });
}


// window.onload = () => {
//     console.log('Initializing Locomotive Scroll...');
//     const scroll = new LocomotiveScroll({
//         el: document.querySelector('.main'),
//         smooth: true,
//         multiplier: 1,
//         inertia: 0.6,
//         lerp: 0.7,
//     });
//     console.log('Initialization complete.');
// }

menuBtn.addEventListener('click', () => {
    secondaryNav.classList.toggle("nav--open");
    // cursor.classList.toggle(".cursor--blend-mode")
    animateMenu();
})



let animateMenu = () => {
    if (secondaryNav.classList.contains('nav--open')) {
        // cursor.style.mixBlendMode = "difference"
        gsap.to('.secondary-navbar-expanded', {
            height: '100vh',
            duration: 0.3,
            ease: 'power2.inOut',
            padding: '1.5rem'
        });
        gsap.to(logo, {
            color: '#fff',
            duration: 0.4,
        });
        gsap.to(secondaryNav, {
            backgroundColor: '#000',
            color: '#fff',
            duration: 0.1,
        })
        gsap.to(cursor, {
            backgroundColor: '#fff',
            duration: 0.4,
        })
        gsap.to('.primary-navbar_link', {
            color: '#fff',
            duration: 0.4,
        })
        gsap.from('.secondary-navbar_primary-list_item_text', {
            y: 30,
            opacity: 0,
            duration: 0.3,
            delay: 0.3,
            stagger: 0.04,
            opacity: 0,
        })
        gsap.from('.secondary-navbar_secondary-list_item_text', {
            opacity: 0,
            duration: 0.4,
            delay: 0.68,
            stagger: 0.08,
            ease: 'power2.out',
        })
        gsap.from('.secondary-navbar_secondary-list_item_text2', {
            opacity: 0,
            duration: 0.4,
            delay: 0.68,
            stagger: 0.08,
            ease: 'power2.out',
        })
    }
    else {
        // cursor.style.mixBlendMode = "none"
        gsap.to('.secondary-navbar-expanded', {
            height: '0',
            duration: 0,
            ease: 'power2.inOut',
            padding: '0',
        });
        gsap.to(logo, {
            color: '#000',
            duration: 0.4,
        });
        gsap.to(secondaryNav, {
            backgroundColor: '#fff',
            color: '#000',
            duration: 0.3,
        });
        gsap.to(cursor, {
            backgroundColor: '#000',
            duration: 0.4,
        });
        gsap.to('.primary-navbar_link', {
            color: '#000',
            duration: 0.8,
        })

    }
}


// scrolling marquee animation code 
// checking if the user 'prefer-reduced-motion' to turn off the scrolling animation if that is the user preference , needed for accessibility reasons
// the scrolling text effect will only work if the 'prefer-reduced-motion' is not set to active by the user
const scrollers = document.querySelectorAll('.scroller');

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addScrollingAnimation(); // if `prefer-reduced-motion` is in active then call for animation
}


// the srolling animation will work if the scroller has "data-animated: true"
// this attribute will be added only if the 'prefer-reduced-motion' is inactive
function addScrollingAnimation() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);


        // dublicating the scroll content
        const scrollerContent = scroller.querySelector('.scroller-content');
        // first it takes the children elements of the scroller-content which in thise case are the li elements and then creates an aray out of them
        const scrollerDublicate = Array.from(scrollerContent.children);

        scrollerDublicate.forEach(item =>{
            // For each element (item) in the array, cloneNode(true) is called. The cloneNode method creates a copy of the node, and the true argument indicates that it should perform a deep clone, meaning it copies not only the specified node but also all of its descendants (child nodes, grandchildren, and so on).
            const dublicatedItem = item.cloneNode(true);
            console.log(dublicatedItem); // printing the cloned item to check
            dublicatedItem.setAttribute("aria-hidden", true); // setting this will make the rest of the dublicates invisible to screen reader because it's the same text only
            scrollerContent.appendChild(dublicatedItem);
        })

    });
}


