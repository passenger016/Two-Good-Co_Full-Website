const cursor = document.querySelector(".cursor");
const menuBtn = document.querySelector(".menu-btn");
const secondaryNav = document.querySelector(".secondary-navbar");
const logo = document.querySelector(".logo");
const cartBtn = document.querySelector('.cart-btn');
const cartCard = document.querySelector('.cart-expanded');
const backToMenuBtn = document.querySelector('.back-to-menu-btn')
let navState = false

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
    if (document.title == 'Home') {
        gsap.from(".first-section_heading", {
            y: 400, // starts from y:30 and ends at the current position
            opacity: 0, // it starts from opacity 0 and ends at 1(current opacity)
            duration: 0.6, // the total animation duration
            delay: 0.5, // before the start of the animation there will be a 0.5 second delay
            stagger: 0.2 // delay of 0.2s between each element under the animation
        });
    }
    if (document.title == 'Shop') {
        gsap.from(".shop_first-section_heading", {
            y: 400, // starts from y:30 and ends at the current position
            opacity: 0, // it starts from opacity 0 and ends at 1(current opacity)
            duration: 0.6, // the total animation duration
            delay: 0.5, // before the start of the animation there will be a 0.5 second delay
            stagger: 0.2 // delay of 0.2s between each element under the animation
        });
    }

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

/* listening for click on the 'back to menu' button in the donate section , on click the donate section is hidden while the nav and other contents remain same and the 
primary list of the nav is made visible and also animated*/
backToMenuBtn.addEventListener('click', () => {
    document.querySelector('.secondary-navbar_donate-container').classList.add('hidden');
    document.querySelector('.secondary-navbar_primary-list').classList.remove('hidden');

    // adding the animation for th primary list of the secondary navbar
    gsap.from('.secondary-navbar_primary-list_item_text', {
        y: 30,
        opacity: 0,
        duration: 0.3,
        delay: 0.3,
        stagger: 0.04,
        opacity: 0,
    })
})






function checkNavOpened() {
    navState = (secondaryNav.classList.contains("nav--open")) ? true : false;
    console.log(`secondary nav opened :${navState}`);
}


function openDonateCard() {
    if (navState) {
        console.log('nav already open')
        console.log(`secondary nav state: ${navState}`);
        document.querySelector('.secondary-navbar_primary-list').classList.add('hidden')
        if (document.querySelector('.secondary-navbar_donate-container').classList.contains('hidden'))
            document.querySelector('.secondary-navbar_donate-container').classList.remove('hidden')
    }
    else {
        document.querySelector('.secondary-navbar_donate-container').classList.remove('hidden')
        secondaryNav.classList.toggle("nav--open");
        checkNavOpened();
        document.querySelector('.secondary-navbar_primary-list').classList.add('hidden')
        if (secondaryNav.classList.contains("nav--open") || secondaryNav.classList.contains("card--open")) {
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
            gsap.to('.logo_icon', {
                filter: 'invert(1)',
            })
        }
        else {
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
            gsap.to('.logo_icon', {
                filter: 'invert(0)',
            })
        }
        animateMenu();
    }
}



menuBtn.addEventListener('click', () => {


    // if (navState) {
    //     console.log('nav already open')
    //     document.querySelector('.secondary-navbar_primary-list').classList.remove('hidden')
    //     if (!(document.querySelector('.secondary-navbar_donate-container').classList.contains('hidden')))
    //         document.querySelector('.secondary-navbar_donate-container').classList.add('hidden')
    // }

    if (navState) {
        console.log('nav was closed')

    }

    secondaryNav.classList.toggle("nav--open");
    checkNavOpened();

    if (document.querySelector('.secondary-navbar_primary-list').classList.contains('hidden'))
        document.querySelector('.secondary-navbar_primary-list').classList.remove('hidden')

    if (secondaryNav.classList.contains("nav--open") || secondaryNav.classList.contains("card--open")) {
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
        gsap.to('.logo_icon', {
            filter: 'invert(1)',
        })
    }
    else {
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
        gsap.to('.logo_icon', {
            filter: 'invert(0)',
        })
    }
    // document.querySelector('.secondary-navbar_donate-container').classList.add('hidden')
    animateMenu();
})



let animateMenu = () => {
    if (secondaryNav.classList.contains('nav--open')) {
        if (secondaryNav.classList.contains('card--open')) {
            secondaryNav.classList.remove('card--open');
            animateCartCard();
        }
        // cursor.style.mixBlendMode = "difference"
        gsap.to('.secondary-navbar-expanded', {
            height: '100vh',
            duration: 0.3,
            ease: 'power2.inOut',
            padding: '1.5rem'
        });
        // gsap.to(logo, {
        //     color: '#fff',
        //     duration: 0.4,
        // });
        // gsap.to(secondaryNav, {
        //     backgroundColor: '#000',
        //     color: '#fff',
        //     duration: 0.1,
        // })
        // gsap.to(cursor, {
        //     backgroundColor: '#fff',
        //     duration: 0.4,
        // })
        // gsap.to('.primary-navbar_link', {
        //     color: '#fff',
        //     duration: 0.4,
        // })
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
        // gsap.to(logo, {
        //     color: '#000',
        //     duration: 0.4,
        // });
        // gsap.to(secondaryNav, {
        //     backgroundColor: '#fff',
        //     color: '#000',
        //     duration: 0.3,
        // });
        // gsap.to(cursor, {
        //     backgroundColor: '#000',
        //     duration: 0.4,
        // });
        // gsap.to('.primary-navbar_link', {
        //     color: '#000',
        //     duration: 0.8,
        // })

    }
}

cartBtn.addEventListener('click', () => {
    secondaryNav.classList.toggle('card--open');
    if (secondaryNav.classList.contains("nav--open") || secondaryNav.classList.contains("card--open")) {
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
        gsap.to('.logo_icon', {
            filter: 'invert(1)',
        })
    }
    else {
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
        gsap.to('.logo_icon', {
            filter: 'invert(0)',
        })
    }
    animateCartCard();
})

let animateCartCard = () => {
    if (secondaryNav.classList.contains('card--open')) {
        if (secondaryNav.classList.contains('nav--open')) {
            secondaryNav.classList.remove('nav--open');
            animateMenu();
        }
        gsap.to(cartCard, {
            height: '80vh',
            duration: 0.3,
            ease: 'power2.inOut',
        })
        gsap.from('.card-expanded-content_top-container', {
            y: -20,
            opacity: '0',
            duration: 0.3,
            stagger: 0.1,
            delay: 0.39,
        })
    }
    else {
        gsap.to(cartCard, {
            height: '0',
            duration: 0
        })
    }
}



// frequency of fonation , one-time , weekly or monthly button selected code

let donationBtns = document.querySelectorAll('.donation-frequency_btn');

donationBtns.forEach((donationBtn) => {
    donationBtn.addEventListener('click', () => {

        // remove the 'clicked' class from each button
        donationBtns.forEach((donationBtn) => {
            donationBtn.classList.remove('clicked');
        });

        // add the 'clicked' class to the current button
        donationBtn.classList.add('clicked');
    })
})








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

        scrollerDublicate.forEach(item => {
            // For each element (item) in the array, cloneNode(true) is called. The cloneNode method creates a copy of the node, and the true argument indicates that it should perform a deep clone, meaning it copies not only the specified node but also all of its descendants (child nodes, grandchildren, and so on).
            const dublicatedItem = item.cloneNode(true);
            console.log(dublicatedItem); // printing the cloned item to check
            dublicatedItem.setAttribute("aria-hidden", true); // setting this will make the rest of the dublicates invisible to screen reader because it's the same text only
            scrollerContent.appendChild(dublicatedItem);
        })

    });
}


// Add an event listener to the window for the scroll event
window.addEventListener('scroll', function () {
    // Check if the vertical scroll position is greater than 0
    console.log(window.scrollY)
    if (window.scrollY > 0) {
        console.log('Window has been scrolled.');
        gsap.to('.primary-navbar_link', {
            opacity: 0,
        })
        document.querySelector('.logo-container').classList.add('move-up')
    } else {
        gsap.to('.primary-navbar_link', {
            opacity: 1,
        })
        document.querySelector('.logo-container').classList.remove('move-up')
        console.log('Window is at the top.');
    }
});


// splitting of letters for the circular text

const circularText = document.querySelector('.circular-text');

circularText.innerHTML = circularText.textContent.replace(/\S/g, "<span>$&</span>");

const circularSpan = document.querySelectorAll('span');
for (let i = 0; i < circularSpan.length; i++) {
    circularSpan[i].style.transform = "rotate(" + i * 12.2 + "deg)"
}