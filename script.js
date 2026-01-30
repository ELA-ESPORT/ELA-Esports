document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

    // ===== CINEMATIC HEADER LETTER ANIMATION =====
    const header = document.getElementById("animatedHeader");

    if (header) {
        const text = header.innerText;
        header.innerHTML = "";

        [...text].forEach((char, i) => {
            const span = document.createElement("span");
            span.innerHTML = char === " " ? "&nbsp;" : char;
            span.style.animationDelay = `${i * 0.12}s`;
            header.appendChild(span);
        });
    }


    // Initial Load Animations
    const tl = gsap.timeline();
    tl.from("#navbar", { y: -100, opacity: 0, duration: 1 })
      .from(".hero-content h1", { scale: 1.1, opacity: 0, duration: 1.5, ease: "power4.out" }, "-=0.5")
      .from(".collab-banner", { y: 20, opacity: 0, duration: 1 }, "-=1");

    // Scroll Reveal for Section Elements
    const reveals = document.querySelectorAll(".reveal-up");
    reveals.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Admin Panel Logic
    const adminLink = document.querySelector(".admin-link");
    const adminModal = document.querySelector(".admin-modal");
    const closeAdminBtn = document.getElementById("close-admin-btn");

    adminLink.addEventListener("click", (e) => {
        e.preventDefault();
        adminModal.style.display = "flex";
    });

    closeAdminBtn.addEventListener("click", () => {
        adminModal.style.display = "none";
    });

    adminModal.addEventListener("click", (e) => {
        if (e.target === adminModal) {
            adminModal.style.display = "none";
        }
    });

    window.updateEvent = () => {
        const name = document.getElementById("admin-event-name").value;
        const desc = document.getElementById("admin-event-desc").value;
        
        if(!name) return alert("Please enter event name");

        const eventList = document.getElementById("upcoming-events-list");
        const newEvent = document.createElement("div");
        newEvent.className = "event-card";
        newEvent.innerHTML = `
            <div class="status-badge">LIVE UPDATE</div>
            <h3>${name}</h3>
            <p>${desc}</p>
            <button class="event-btn">Register Team</button>
        `;
        eventList.prepend(newEvent);
        adminModal.style.display = "none";
        alert("Management Update Successful!");
    };
});
