const cursor = document.querySelector(".cursor");
const menuBtn = document.querySelector(".menu-btn");
const secondaryNav = document.querySelector(".secondary-navbar");
const logo = document.querySelector(".logo");
const cartBtn = document.querySelector('.cart-btn');
const cartCard = document.querySelector('.cart-expanded');
const backToMenuBtn = document.querySelector('.back-to-menu-btn');
const products = document.querySelectorAll('.product--card');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const cartItemCard = document.querySelector('.cart-item-expanded');



let navState = false
let windowLoaded = false;
let productAmount;





// instead of checking for dom content loading check for when the entire window has been loaded then fire the primary animations
window.addEventListener('load', function () {

    // Code to run after the window has finished loading
    document.querySelector('.pre-loader-container').classList.add('hidden');
    console.log('Window has finished loading');
    setTimeout(() => {
        // creating a fake delay before loading the primary animations
        // window.dispatchEvent(new Event('load'));
    }, 1500);
    console.log(`document title is ${this.document.title}`)
    firstHeadingAnimation();
    promotionAnimation();


});






window.addEventListener('mousemove', (e) => {
    const x = e.clientX - cursor.offsetWidth / 2;
    const y = e.clientY - cursor.offsetHeight / 2;
    let interactable = e.target.closest(".interactable");
    const interacting = interactable !== null; // boolean that returns true if interacting else false

    // console.log(`interacting: ${interacting}`);


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

    // console.log(`${x}px,${y}px`)


    // check if the cursor is interacting with products
    let productInteractable = e.target.closest('.product--card');
    const productInteracting = productInteractable !== null // retunrs true if productInteractable is true else false


    let cursorScale;
    let cursorOpcity;
    let cursorColor;

    if (interacting) {
        cursorScale = 5;
        cursorOpcity = 1;
        cursorColor = '#000000';
    }
    else if (productInteracting) {
        cursorScale = 13;
        cursorOpcity = 0.08;
        // const currentProductId = e.target.closest('.product--card').id;
        // console.log(currentProductId);
        // const findProduct = productsList.find(product => product.id === currentProductId);
        // console.log(findProduct);
        cursorColor = '#f97316'
        // cursorColor = findProduct.color;

    }
    else {
        cursorScale = 1;
        cursorOpcity = 1;
        cursorColor = '#000000';
    }



    // make the mouse trailer lag a bit behind the cursor
    // creating an keyframes object
    const keyframes = {
        transform: `translate(${x}px , ${y}px) scale(${cursorScale})`,
        opacity: `${cursorOpcity}`,
        backgroundColor: `${cursorColor}`,
    }

    cursor.animate(keyframes, {
        duration: 700, // duration in mili seconds
        fill: "forwards" // starts back from the last ending point
    });


}


function firstHeadingAnimation() {
    if (this.document.title == 'Home') {
        gsap.from(".first-section_heading", {
            y: 400, // starts from y:30 and ends at the current position
            opacity: 0, // it starts from opacity 0 and ends at 1(current opacity)
            duration: 0.6, // the total animation duration
            delay: 0.5, // before the start of the animation there will be a 0.5 second delay
            stagger: 0.2 // delay of 0.2s between each element under the animation
        });
    }
    if (this.document.title == 'Shop') {
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





// checking the state of the secondary navbar is opened or not opened
function checkNavOpened() {
    // navState = (secondaryNav.classList.contains("nav--open")) ? true : false;
    // console.log(`secondary nav opened :${navState}`);

    if (secondaryNav.classList.contains('nav--open'))
        navState = true;
    else
        navState = false;
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



    secondaryNav.classList.toggle("nav--open");
    checkNavOpened(); // calling the function to check for the  nav state

    if (navState) {
        console.log('nav is opened');
    }
    else {
        console.log('nav was closed')
    }

    if (!(document.querySelector('.secondary-navbar_donate-container').classList.contains('hidden')))
        document.querySelector('.secondary-navbar_donate-container').classList.add('hidden')

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

        console.log('cursor color is white')

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

        console.log('cursor color is black')

        gsap.to('.primary-navbar_link', {
            color: '#000',
            duration: 0.8,
        })
        gsap.to('.logo_icon', {
            filter: 'invert(0)',
        })

    }
    animateMenu();
})



let animateMenu = () => {
    if (secondaryNav.classList.contains('nav--open')) {
        if (secondaryNav.classList.contains('card--open')) {
            secondaryNav.classList.remove('card--open');
            animateCartCard();
        }
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


    // check if the secondary navbar is opened , if opened then close it by removing the 'nav--open' class
    if (secondaryNav.classList.contains('nav--open')) {
        secondaryNav.classList.remove('nav--open')

        // animate the navbar closing after the 'nav--open' class has been removed
        animateMenu()
        console.log('nav was closed')
        navState = false; // change the global navstate to false to store that nav section has been closed
    }




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
        if (cart.length == 0) {

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
            gsap.to(cartItemCard, {
                height: '100vh',
                duration: 0.3,
                ease: 'power2.inOut',
                paddingTop: '15rem',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
            })
            gsap.from('.cart-item-expanded_inner-container',{
                opacity: 0,
                duration: 0.7,
                delay: 0.34,            
            })
            gsap.from('.cart-item-expanded_item',{
                delay: 0.34,
                y: 20,
                duration: 0.6,
                stagger: 0.1,
            })
        }
    }
    else {
        if(cart.length == 0){
        gsap.to(cartCard, {
            height: '0',
            duration: 0
        })}
        else{
            gsap.to(cartItemCard, {
                height: '0',
                duration: 0,
                paddingTop: '0',
                paddingLeft: '0',
                paddingRight: '0',
            })
        }

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
    // console.log(window.scrollY)
    if (window.scrollY > 0) {
        // console.log('Window has been scrolled.');
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







// listening to click events on each product 
products.forEach((product, i) => {
    product.addEventListener('click', () => {
        const productId = products[i].id;
        console.log(`product was clicked ${productId}`); // just for checking if the right product is being clicked
        if (this.document.title == 'Home')
            window.location.href = `/pages/product.html?id=${productId}`
        if (this.document.title == 'Shop')

            window.location.href = `product.html?id=${productId}` // replace it by `` to mak the product id be displayed
    })
})







// logic for dynamically adding content to the product.html starts here. 
// info1 and info2 are for paragraph 1 and 2 respectively for each product.
// extrainfo stands for the 'the nitty gritty' part of the description of the product.
// the color is to for the text and the button color for respective porduct.
// the bgColor is to set the background color of the respective product.

// additional notes, make an ingredients property for each object and if that paragraph exists then add it otheriwse no need to add it.
const productsList = [
    {
        id: 0,
        name: 'change the course cookbook',
        price: '$45',
        thumbnailImage: '../images/iloveimg-compressed/product image 0.png',
        info1: 'In our third cookbook, we pay homage to our origins; our core belief that having less time or money should never mean less love and nourishment. That good food prepared with care is a universal act of love - and self love - with the power to change the course of someones life.',
        info2: 'The recipes within CHANGE THE COURSE are shorter, the ingredients are simpler, and the techniques more adaptable...all designed to help you achieve the same goodness with less.',
        extrainfo: 'Hardcover, 214 pages, 100+ Recipes.',
        bgColor: '#f5e8d8',
        color: '#e6622b',
    },
    {
        id: 1,
        name: 'change the course cook kit',
        price: '$95',
        thumbnailImage: '../images/iloveimg-compressed/product image 1.png',
        info1: 'At Two Good Co, we believe that food is more than food…we believe that food is a universal love language, with the power to change the course of someones life.',
        info2: 'Our Change The Course Cookbook features shorter recipes, simpler ingredients and adaptable techniques, designed to help you achieve goodness with less, while our 100% cotton twill apron looks good and works hard for anyone serving up Good Food and Good Times.',
        bgColor: '#f5e8d8',
        color: '#e6622b',
    },
    {
        id: 2,
        name: 'the inside scoop good feels crackers set',
        price: '$50',
        thumbnailImage: '../images/iloveimg-compressed/product image 2.png',
        info1: 'Enhance your holiday gifting with our exquisite set of six beautifully packaged Good Feels Crackers.',
        info2: 'With each Good Feels Cracker, you gift a nutritious, delicious dinner cooked with love to women and their children taking refuge in a shelter…as well as receive a voucher for a free scoop of Messina gelato (valid until 31 Dec 2024).',
        extrainfo: 'Pack of 6 Crackers.',
        bgColor: '#e6e6e6',
        color: '#000000',
    },
    {
        id: 3,
        name: 'HUNTER X TWO GOOD CANDLE - STRAWBERRY GUM + PEPPERBERRY',
        price: '$49',
        thumbnailImage: '../images/iloveimg-compressed/product image 3.png',
        info1: 'Inspired by Two Goods exquisite Strawberry Gum & Pepperberry Curing Salt, this collaboration between Hunter Candles and Two Good Co offers a limited edition candle that embodies the unique flavor profile and olfactory expression of the culinary masterpiece.',
        info2: 'Surrender to the enchanting aroma of sweet strawberry gum notes blending harmoniously with the warmth of pepperberry, creating a captivating and inviting ambiance.',
        extrainfo: 'Burning hours: 45+. Biodegradable soy wax, made using pure soy beans; free from pesticides, palm oil, petroleum and GMOs. Hand-poured in Newtown, Australia. Always store candle in a cool, dry place below 25C and away from direct sunlight.',
        bgColor: '#fdf4f0',
        color: '#625954',

    },
    {
        id: 4,
        name: 'the good old glaze kit',
        price: '$120',
        thumbnailImage: '../images/iloveimg-compressed/product image 4.png',
        info1: 'Cookbooks with dog-eared recipe pages; hands wiped clean on trusty aprons; deft hands brushing vibrant concoctions onto steaming hams...',
        info2: '',
        extrainfo: '',
    },
    {
        id: 10,
        name: 'two good native tea',
        price: '$34',
        thumbnailImage: '../images/iloveimg-compressed/product image 10.png'
    },
    {
        id: 6,
        name: '',
        price: '',
    },
    {
        id: 7,
        name: 'NATIVE SPICED DUKKAH',
        price: '$18',
        thumbnailImage: '../images/iloveimg-compressed/product image 7.png',
        info1: 'Crunchy. Tasty. Salty. Spicy.',
        info2: 'Sprinkle it on your eggs or sliced avo for brekkie, scatter on top of your soup, whisk into a salad dressing or crust your fish or chicken before grilling, or add as a dunking option alongside your bread, olive oil and Blak Cede Citrus Salt.',
        extrainfo: '100g',
        bgColor: '#e8f4ee',
        color: '#678275',

    }
]


const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get('id')) {
    console.log('we are on the product page');

    // grabbing thr product's id to change it's information
    const productId = parseInt(urlParams.get('id'));
    // looking for the product by it's id in the array or objects named 'productList'
    const findProduct = productsList.find(product => product.id === productId);
    console.log(`${findProduct.name}`); // printing the name of thr product to check if it's working properly
    document.querySelector('.product--price').textContent = findProduct.price;
    document.querySelector('.product--name').textContent = findProduct.name;
    console.log(findProduct.thumbnailImage)
    console.log(`current src ${document.querySelector('.product--thumbnail-image').src}`)
    document.querySelector('.product--thumbnail-image').src = findProduct.thumbnailImage;
    document.querySelector('.product--info1').textContent = findProduct.info1;
    document.querySelector('.product--info2').textContent = findProduct.info2;
    document.querySelector('.extra--info').textContent = findProduct.extrainfo;
    document.querySelector('.product--bg-color').style.backgroundColor = findProduct.bgColor;


    const productColor = document.querySelectorAll('.product--color');
    productColor.forEach(product => {
        product.style.color = findProduct.color;
    })
    document.querySelector('.product--btn-color').style.backgroundColor = findProduct.color;
    document.querySelector('.product_first-section_inner-container').style.borderBottom = `1px solid ${findProduct.color}`;
    document.querySelector('.product--name').style.color = findProduct.color

    // taking the adding and substract buttons as variables
    productAddBtn = document.querySelector('.product_first-section_first-container_btn_counter--add');
    productSubsBtn = document.querySelector('.product_first-section_first-container_btn_counter--substract');
    productAmountText = document.querySelector('.product_first-section_first-container_btn_counter');

    productAmount = 1; // initialisng the product number to '1' as it cannot be 0 everytime when the product.html page is loaded

    // listening to the click  events on the add button or the substract button to add or substract the product number
    productAddBtn.addEventListener('click', () => {

        productAmount = productAmount + 1;
        productAmountText.textContent = `${productAmount}`;
    })

    productSubsBtn.addEventListener('click', () => {
        if ((productAmountText.textContent) != '1') { // product number cannot go to zero
            productAmount = productAmount - 1;
            productAmountText.textContent = `${productAmount}`;
        }
    })


    // code for dynamicly adding the promotional images of the product
    let productPromoImgs = document.querySelectorAll('.product--image');
    let productPromoMainImg = document.querySelector('.product--image-main');
    let counter = 1;
    let error = false;
    productPromoImgs.forEach(productPromoImg => {

        let error = false;

        // const imgUrl = productPromoImg.src;
        // Extract the file extension from the URL
        // const fileExtension = imgUrl.split('.').pop().toLowerCase();



        // Check the file extension and display a message also add the file path with the required file extension.
        // if (fileExtension === 'png') {
        //     console.log('Image has a png extension. adding image for counter' + counter);
        //     productPromoImg.src = `../images/iloveimg-compressed/${productId}-product promo image ${counter}.png`;
        //     currentSrc = `../images/iloveimg-compressed/${productId}-product promo image ${counter}.png`
        // } else if (fileExtension === 'jpeg') {
        //     console.log('Image has a jpeg extension. adding image for counter' + counter);
        //     productPromoImg.src = `../images/iloveimg-compressed/${productId}-product promo image ${counter}.jpeg`;
        //     currentSrc = `../images/iloveimg-compressed/${productId}-product promo image ${counter}.jpeg`
        // }
        // else if (fileExtension === 'jpg') {
        //     console.log('Image has a jpg extension. adding image for counter' + counter);
        //     productPromoImg.src = `../images/iloveimg-compressed/${productId}-product promo image ${counter}.jpg`;
        //     currentSrc = `../images/iloveimg-compressed/${productId}-product promo image ${counter}.jpg`
        // }
        // else {
        //     console.log('image has an invalid extention.');
        // }

        productPromoImg.src = `../images/iloveimg-compressed/${productId}-product promo image ${counter}.png`;

        productPromoImg.onerror = function () {
            error = true;
        }
        if (error) {
            console.log('erro loading , changing file extension to' + `../images/iloveimg-compressed/${productId}-product promo image ${counter}.jpeg`);
            productPromoImg.src = `../images/iloveimg-compressed/${productId}-product promo image ${counter}.png`;
        }




        counter = counter + 1;



    })

    productPromoMainImg.src = `../images/iloveimg-compressed/${productId}-product promo image main 1.png`;
    productPromoMainImg.src.onerror = function () {
        error = true;
    }
    if (error) {
        productPromoMainImg.src = `../images/iloveimg-compressed/${productId}-product promo image main 1.jpeg`
    }






}




gsap.registerPlugin(ScrollTrigger)


// animating the product container and the quote container together


gsap.utils.toArray('.animate--card').forEach((card) => {
    gsap.from(card, {
        opacity: 0,
        y: 15,
        duration: 1,
        delay: 0.15,
        scrollTrigger: {
            trigger: card,
            start: 'top 94%',
        }
    });
});

gsap.from('.animate--category', {
    opacity: 0,
    stagger: 0.2,
    scale: 1.05,
    duration: 0.8,
    delay: 0.15,
    scrollTrigger: {
        trigger: '.second-section_category-container',
        top: 'top 90%',
    }
})





addToCartBtn.addEventListener('click', () => {
    console.log('add to cart was clicked');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    console.log('productId is ' + productId);

    const currentProduct = findProduct(productId);
    addToCart(currentProduct.name, currentProduct.price, productAmount);

})


function findProduct(productId) {
    const currentProduct = productsList.find(product => product.id == productId)
    return currentProduct;
}


let cart = []; // initialising an empty array to store the objects of each product

function addToCart(productName, productPrice, productAmount) {
    const newItem = {
        name: productName,
        price: productPrice,
        amount: productAmount,
    }

    console.log(`product added ,name: ${newItem.name}, price: ${newItem.price}, amount:${newItem.amount}`)

    // pushing the new item to the cart array
    cart.push(newItem)
}