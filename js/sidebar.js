// Get elements
const open_mobileBtn = document.getElementById("open-mobileBtn");
const close_mobileBtn = document.getElementById("close-mobileBtn");
const mobileSideNav_Container = document.getElementById("mobile-sideNav-Container");
const mobileSideNav_Wrapper = document.getElementById("mobile-sideNav-Wrapper");

// Show sidebar
open_mobileBtn.addEventListener("click", () => {
    mobileSideNav_Container.classList.remove("hidden");
    mobileSideNav_Wrapper.classList.remove("slide-out");
    mobileSideNav_Wrapper.classList.add("slide-in");
    document.body.style.overflow = "hidden";
});

// Hide sidebar
close_mobileBtn.addEventListener("click", () => {
    mobileSideNav_Wrapper.classList.remove("slide-in");
    mobileSideNav_Wrapper.classList.add("slide-out");

    setTimeout(() => {
        mobileSideNav_Container.classList.add("hidden");
        document.body.style.overflow = "auto";
    }, 499); 
});

function closeMobile_Sidebar(){
    mobileSideNav_Wrapper.classList.remove("slide-in");
    mobileSideNav_Wrapper.classList.add("slide-out");

    setTimeout(() => {
        mobileSideNav_Container.classList.add("hidden");
        document.body.style.overflow = "auto";
    }, 499); 
}

/////////// 
//Part 04 - Button click scroll to section (mobile/tablet)
const scrollToButton_Mobile = document.querySelectorAll(".scroll-to-buttonMobile");

scrollToButton_Mobile.forEach(button => {

    button.addEventListener("click", (event) => {

        if(document.getElementById("open-mobileBtn")){

            console.log("element exists");
            
            // Prevent the default action (e.g., if using <a> tags)
            event.preventDefault();

            closeMobile_Sidebar();
    
            // Get the target element from the button's data-target attribute
            const targetSelector = event.currentTarget.dataset.target;
            const targetElement = document.querySelector(targetSelector);
    
            if (targetElement) {
    
                // Smooth scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth",
                })
    
            } else {
    
                console.error(`Target element not found for selector: ${targetSelector}`);
            
            }
        }

    });

});

/////////////////////
//Mobile Sticky Nav 