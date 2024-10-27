///////////////////////////
//About Me Title animation
function resetAnimations() {
    // Select all elements that have an animation
    const animatedElements = document.querySelectorAll('.firstLetterA, .secondLetterA, .firstLetterB, .secondLetterB, .firstLetterO, .secondLetterO, .firstLetterU, .secondLetterU, .firstLetterT, .secondLetterT, .firstLetterM, .secondLetterM, .firstLetterE, .secondLetterE');

    // Remove animation and trigger reflow, then reapply the animation
    animatedElements.forEach((element) => {

        // Get current animation settings
        const animation = window.getComputedStyle(element).animation;
        
        // Remove animation
        element.style.animation = 'none';

        // Trigger a reflow to restart the animation
        element.offsetHeight; //forces reflow

        // Reapply the original animation
        element.style.animation = animation;
    });
}

// Continuously reset the animations in a loop
function startContinuousAnimationReset() {
    // Set an interval that matches the total time for all animations (18s)
    const totalAnimationDuration = 18000; // 18s

    // Run reset function continuously every 18 seconds
    setInterval(resetAnimations, totalAnimationDuration);
}

startContinuousAnimationReset();

////////////////////////////
//HomePg Scroll animation

///////////
//Part 01 - Snap scroll animation
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".section");
const lastSection = document.querySelector("#projects-Container");

sections.forEach((section, index) => {
    //Scroll trigger for each section except the last one
    if (section !== lastSection) {
        ScrollTrigger.create({
            trigger: section,
            start: "top top",  // Start snapping at the top
            end: () => `+=${section.offsetHeight}`,  // End based on the section's height
            snap: {
                snapTo: sections.map((_, i) => i),  // Snap to the index of each section
                duration: { min: 0.2, max: 0.8 },  // Snapping speed
                ease: "power1.inOut"
            },
            pin: false, 
            scrub: true
            //markers: {
            //    fontSize: "20px",
            //    indent: 150
            //}
        });
    }
});

// Custom for the last section due to no fixed height
ScrollTrigger.create({
    trigger: lastSection,
    start: "top top",  // Snap it to the top
    end: () => `+=${lastSection.offsetHeight}`,  // Let it scroll freely once snapped
    pin: false,  
    scrub: true 
    //markers: {
    //    fontSize: "20px",
    //    indent: 150
    //}
});

// Refresh ScrollTrigger on window load
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});

// Prevent scroll jump on refresh
window.history.scrollRestoration = "manual";
///////////
//Part 02 - Slide down or up elements
function scrollSection_Setup() {
    const landing_Container = document.getElementById("landing-Container");
    const aboutMe_Container = document.getElementById("aboutMe-Container");
    const mySkills_Container = document.getElementById("mySkills-Container");
    const projects_Container = document.getElementById("projects-Container");

    const landing_Elements = window.innerWidth < 768 ? [".landing-Wrapper-SM"] : [".landing-Wrapper-LG"];
    const aboutMe_Elements = ["#aboutMe-bckImg", "#aboutMe-titleContainer", "#aboutMe-Text"];
    const mySkills_Elements = ["#mySkills-bckImg", "#mySkills-Wrapper"];
    const projects_Elements = ["#projects-Wrapper"];

    const scrollLinks = document.querySelectorAll('a.scroll-to-button[data-target]');

    scrollLinks.forEach(link => {
        const targetSectionSelector = link.getAttribute('data-target');
        const targetSection = document.querySelector(targetSectionSelector);

        if (targetSection) {
            if (targetSectionSelector === '#landing-Container') {
                scrollSection_Animation(landing_Elements, landing_Container, link);
            } else if (targetSectionSelector === '#aboutMe-Container') {
                scrollSection_Animation(aboutMe_Elements, aboutMe_Container, link);
            } else if (targetSectionSelector === '#mySkills-Container') {
                scrollSection_Animation(mySkills_Elements, mySkills_Container, link);
            } else if (targetSectionSelector === '#projects-Container') {
                // Customisation case for #projects-Container
                scrollSection_Animation(projects_Elements, projects_Container, link, true);
            }
        }
    });
}

function scrollSection_Animation(scrollElements, triggerSection, navLink, isProjectsSection = false) {
    //conditional (ternary) for the custom case for #projects-Container
    const observerOptions = isProjectsSection
        ? {
            root: null,
            rootMargin: "0px 0px -20% 0px",
            threshold: 0.1
        }
        : {
            root: null,
            threshold: window.innerWidth < 768 ? 0.5 : 0.8
        };

    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
            scrollElements.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.classList.remove("hidden_Elements", "slideDown_Elements");
                    element.classList.add("slideUp_Elements");
                }
            });

            if (navLink) {
                navLink.classList.add("active");
            }

        } else {
            scrollElements.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.classList.remove("slideUp_Elements");
                    element.classList.add("slideDown_Elements", "hidden_Elements");
                }
            });

            if (navLink) {
                navLink.classList.remove("active");
            }
        }
    }, observerOptions);

    if (triggerSection) {
        observer.observe(triggerSection);
    } else {
        console.warn("Trigger section element not found.");
    }
}

scrollSection_Setup();

///////////
//Part 03 - Button click scroll to section (desktop)
const scrollToButtons = document.querySelectorAll(".scroll-to-button");

scrollToButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        // Prevent the default action (e.g., if using <a> tags)
        event.preventDefault();

        // Get the target element from the button's data-target attribute
        const targetSelector = event.currentTarget.dataset.target;
        const targetElement = document.querySelector(targetSelector);

        if (targetElement) {
            // Smooth scroll to the target element
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"  // Aligns the target element to the top of the viewport
            });
        } else {
            console.error(`Target element not found for selector: ${targetSelector}`);
        }
    });
});
