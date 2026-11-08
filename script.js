
/* ========================================
   FARIHA ALAM — PORTFOLIO JAVASCRIPT
   ======================================== */


/* ===== SCROLL REVEAL ANIMATIONS ===== */

const revealElements = document.querySelectorAll(
    ".hero-content, .hero-image, .section-heading, " +
    ".about-content, .portfolio-card, .personal-note, .contact-card"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


/* ===== STAGGERED CARD ANIMATIONS ===== */

document.querySelectorAll(".portfolio-grid").forEach((grid) => {
    grid.querySelectorAll(".portfolio-card").forEach((card, index) => {
        card.style.setProperty("--card-index", index);
    });
});


/* ===== ACTIVE NAVIGATION ===== */

const navLinks = document.querySelectorAll(".nav-links a");

const sections = document.querySelectorAll(
    "#home, #about, #skills, #achievements, " +
    "#projects, #activities, #more, #contact"
);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navLinks.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });
            });
        },
        {
            threshold: 0,
            rootMargin: "-25% 0px -65% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


/* ===== MINI GHOST CURSOR 👻💜 ===== */

// Create the mini ghost cursor if it doesn't exist.
let miniGhost = document.getElementById("miniGhostCursor");

if (!miniGhost) {
    miniGhost = document.createElement("div");
    miniGhost.id = "miniGhostCursor";
    miniGhost.textContent = "👻";
    miniGhost.setAttribute("aria-hidden", "true");
    document.body.appendChild(miniGhost);
}

// Only activate the custom cursor on mouse/pen devices.
const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
);

function setupGhostCursor() {
    if (finePointer.matches) {
        document.body.classList.add("custom-cursor-ready");
    } else {
        document.body.classList.remove("custom-cursor-ready");
        miniGhost.style.display = "none";
    }
}

setupGhostCursor();

if (finePointer.addEventListener) {
    finePointer.addEventListener("change", setupGhostCursor);
} else if (finePointer.addListener) {
    finePointer.addListener(setupGhostCursor);
}

document.addEventListener("pointermove", (event) => {
    if (!finePointer.matches) return;

    if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
        return;
    }

    miniGhost.style.left = event.clientX + "px";
    miniGhost.style.top = event.clientY + "px";
    miniGhost.style.display = "block";
});

document.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") {
        miniGhost.style.display = "none";
    }
});

document.addEventListener("pointerenter", (event) => {
    if (finePointer.matches && event.pointerType === "mouse") {
        miniGhost.style.display = "block";
    }
});


/* ===== LUMI — LAVENDER GHOST 💜 ===== */

const lumi = document.getElementById("lumiAssistant");
const lumiRabbit = document.getElementById("lumiRabbit");
const lumiBubble = document.getElementById("lumiBubble");
const lumiClose = document.getElementById("lumiClose");
const lumiExplore = document.getElementById("lumiExplore");

function openLumi() {
    if (!lumiBubble) return;

    lumiBubble.classList.add("lumi-open");

    if (lumiRabbit) {
        lumiRabbit.setAttribute("aria-expanded", "true");
    }
}

function closeLumi() {
    if (!lumiBubble) return;

    lumiBubble.classList.remove("lumi-open");

    if (lumiRabbit) {
        lumiRabbit.setAttribute("aria-expanded", "false");
    }
}

// Click Lumi to open or close the welcome bubble.
if (lumiRabbit && lumiBubble) {
    lumiRabbit.setAttribute("aria-expanded", "false");

    lumiRabbit.addEventListener("click", () => {
        if (lumiBubble.classList.contains("lumi-open")) {
            closeLumi();
        } else {
            openLumi();
        }
    });
}

// Close button.
if (lumiClose) {
    lumiClose.addEventListener("click", closeLumi);
}

// Explore button scrolls to the About section.
if (lumiExplore) {
    lumiExplore.addEventListener("click", () => {
        closeLumi();

        const aboutSection = document.getElementById("about");

        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}

// Close the bubble when clicking elsewhere.
document.addEventListener("click", (event) => {
    if (
        lumi &&
        lumiBubble &&
        lumiBubble.classList.contains("lumi-open") &&
        !lumi.contains(event.target)
    ) {
        closeLumi();
    }
});

// Escape key also closes Lumi's bubble.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLumi();
    }
});


/* ===== AUTOMATIC FOOTER YEAR 📅 ===== */

const footerYear = document.getElementById("year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}