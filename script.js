/* ============================================================
   RADHIKA CHHANGANI — LEGENDARY PORTFOLIO JS
   Features: Particle canvas, cursor energy trail, preloader,
   awakening sequence, scroll reveal, counter animation,
   3D tilt, parallax orbs, form submission
   ============================================================ */

(function () {
  "use strict";

  /* ════════════════════════════════════
     PRELOADER
  ════════════════════════════════════ */
  let loadPct = 0;
  const pctEl = document.getElementById("prePct");
  const preloader = document.getElementById("preloader");
  const preCanvas = document.getElementById("preCanvas");

  // Animated percentage counter
  const pctInterval = setInterval(() => {
    loadPct += Math.random() * 4;
    if (loadPct >= 100) {
      loadPct = 100;
      clearInterval(pctInterval);
    }
    if (pctEl) pctEl.textContent = Math.round(loadPct) + "%";
  }, 50);

  // Preloader particle canvas
  if (preCanvas) {
    const ctx = preCanvas.getContext("2d");
    preCanvas.width = window.innerWidth;
    preCanvas.height = window.innerHeight;
    const preParticles = Array.from({ length: 60 }, () => ({
      x: Math.random() * preCanvas.width,
      y: Math.random() * preCanvas.height,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      color: ["#4361ee","#7209b7","#f72585","#4cc9f0","#ffb347"][Math.floor(Math.random() * 5)],
      alpha: Math.random() * 0.5 + 0.2,
    }));
    function preRender() {
      if (!preloader.classList.contains("done")) {
        ctx.clearRect(0, 0, preCanvas.width, preCanvas.height);
        preParticles.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > preCanvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > preCanvas.height) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(preRender);
      }
    }
    preRender();
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (preloader) preloader.classList.add("done");
      startAwakeningSequence();
    }, 2200);
  });


  /* ════════════════════════════════════
     HERO PARTICLE CANVAS
  ════════════════════════════════════ */
  const heroCanvas = document.getElementById("heroCanvas");
  if (heroCanvas) {
    const hCtx = heroCanvas.getContext("2d");
    heroCanvas.width = window.innerWidth;
    heroCanvas.height = window.innerHeight;

    const COLORS = ["#4361ee","#7209b7","#f72585","#4cc9f0","#ffb347","#c77dff"];
    const particles = Array.from({ length: 80 }, () => createParticle());

    function createParticle() {
      return {
        x: Math.random() * heroCanvas.width,
        y: Math.random() * heroCanvas.height,
        r: Math.random() * 4 + 1,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.4 + 0.1,
        life: 1,
      };
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            hCtx.beginPath();
            hCtx.strokeStyle = `rgba(67,97,238,${0.08 * (1 - dist / 100)})`;
            hCtx.lineWidth = 0.5;
            hCtx.moveTo(particles[i].x, particles[i].y);
            hCtx.lineTo(particles[j].x, particles[j].y);
            hCtx.stroke();
          }
        }
      }
    }

    function heroRender() {
      hCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      drawConnections();
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > heroCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > heroCanvas.height) p.vy *= -1;
        hCtx.beginPath();
        hCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        hCtx.fillStyle = p.color;
        hCtx.globalAlpha = p.alpha;
        hCtx.fill();
        hCtx.globalAlpha = 1;
      });
      requestAnimationFrame(heroRender);
    }
    heroRender();

    window.addEventListener("resize", () => {
      heroCanvas.width = window.innerWidth;
      heroCanvas.height = window.innerHeight;
    });

    // Mouse interaction — attract particles
    document.addEventListener("mousemove", (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      if (!rect) return;
      const mx = e.clientX, my = e.clientY;
      particles.forEach(p => {
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += (dx / dist) * 0.02;
          p.vy += (dy / dist) * 0.02;
          // Speed cap
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 2) { p.vx = (p.vx / speed) * 2; p.vy = (p.vy / speed) * 2; }
        }
      });
    });
  }


  /* ════════════════════════════════════
     AWAKENING SEQUENCE
  ════════════════════════════════════ */
  function startAwakeningSequence() {
    const aw1 = document.getElementById("aw1");
    const aw2 = document.getElementById("aw2");
    const aw3 = document.getElementById("aw3");
    const awakening = document.getElementById("awakening");
    const heroMain = document.getElementById("heroMain");

    function showWord(el, delay, hideDelay) {
      return new Promise(resolve => {
        setTimeout(() => {
          el.classList.add("show");
          setTimeout(() => {
            el.classList.remove("show");
            el.classList.add("hide");
            setTimeout(resolve, 400);
          }, hideDelay);
        }, delay);
      });
    }

    (async () => {
      await showWord(aw1, 100, 700);
      await showWord(aw2, 100, 700);
      await showWord(aw3, 100, 900);
      setTimeout(() => {
        if (awakening) awakening.style.display = "none";
        if (heroMain) heroMain.classList.add("visible");
        startCounterAnimations();
      }, 300);
    })();
  }


  /* ════════════════════════════════════
     CURSOR ENERGY TRAIL
  ════════════════════════════════════ */
  const trailCanvas = document.getElementById("trailCanvas");
  const tCtx = trailCanvas ? trailCanvas.getContext("2d") : null;
  if (trailCanvas) {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
    window.addEventListener("resize", () => {
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    });
  }

  const trail = [];
  const MAX_TRAIL = 25;
  const TRAIL_COLORS = ["#4361ee","#7209b7","#f72585","#4cc9f0","#ffb347"];

  let mouseX = -200, mouseY = -200;
  let cursorOuterX = -200, cursorOuterY = -200;

  const cursorOuter = document.getElementById("cursorOuter");
  const cursorInner = document.getElementById("cursorInner");

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    if (cursorInner) { cursorInner.style.left = mouseX + "px"; cursorInner.style.top = mouseY + "px"; }
    trail.push({ x: mouseX, y: mouseY, life: 1, color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)] });
    if (trail.length > MAX_TRAIL) trail.shift();
  });

  function animateCursor() {
    cursorOuterX += (mouseX - cursorOuterX) * 0.12;
    cursorOuterY += (mouseY - cursorOuterY) * 0.12;
    if (cursorOuter) { cursorOuter.style.left = cursorOuterX + "px"; cursorOuter.style.top = cursorOuterY + "px"; }
    // Trail render
    if (tCtx) {
      tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      trail.forEach((p, i) => {
        p.life -= 0.04;
        const r = (i / trail.length) * 6 + 1;
        tCtx.beginPath();
        tCtx.arc(p.x, p.y, r, 0, Math.PI * 2);
        tCtx.fillStyle = p.color;
        tCtx.globalAlpha = p.life * 0.4 * (i / trail.length);
        tCtx.fill();
      });
      tCtx.globalAlpha = 1;
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover state
  document.querySelectorAll("a, button, .skill-core, .pj-card, .ach-card, .cl-item, .cmd-card").forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });


  /* ════════════════════════════════════
     NAVBAR SCROLL
  ════════════════════════════════════ */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });


  /* ════════════════════════════════════
     HAMBURGER MENU
  ════════════════════════════════════ */
  const ham = document.getElementById("ham");
  const mobNav = document.getElementById("mobNav");
  let navOpen = false;

  ham && ham.addEventListener("click", () => {
    navOpen = !navOpen;
    mobNav.classList.toggle("open", navOpen);
    const spans = ham.querySelectorAll("span");
    if (navOpen) {
      spans[0].style.transform = "rotate(45deg) translate(5px,5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
    } else {
      spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
    }
  });
  document.querySelectorAll(".mob-link").forEach(l => l.addEventListener("click", () => {
    navOpen = false; mobNav.classList.remove("open");
    ham && ham.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  }));


  /* ════════════════════════════════════
     SCROLL REVEAL
  ════════════════════════════════════ */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), (i % 5) * 80);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
  revealEls.forEach(el => revealObs.observe(el));


  /* ════════════════════════════════════
     COUNTER ANIMATION
  ════════════════════════════════════ */
  function startCounterAnimations() {
    document.querySelectorAll(".an-val[data-target]").forEach(el => {
      const target = parseInt(el.getAttribute("data-target"));
      let current = 0;
      const step = target / 60;
      const interval = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(interval); }
        el.textContent = Math.round(current);
      }, 25);
    });
  }

  // Also trigger when scrolled into view
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    const counterObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCounterAnimations();
        counterObs.disconnect();
      }
    }, { threshold: 0.3 });
    counterObs.observe(aboutSection);
  }


  /* ════════════════════════════════════
     PARALLAX ORBS ON MOUSE
  ════════════════════════════════════ */
  const orbs = document.querySelectorAll(".orb");
  document.addEventListener("mousemove", (e) => {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const rx = (e.clientX - cx) / cx;
    const ry = (e.clientY - cy) / cy;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 8;
      orb.style.transform = `translate(${rx * factor}px, ${ry * factor}px)`;
    });
  });


  /* ════════════════════════════════════
     SKILL CORE ENERGY PULSE
  ════════════════════════════════════ */
  document.querySelectorAll(".skill-core").forEach(sc => {
    sc.addEventListener("mouseenter", () => {
      sc.querySelector(".sc-pulse").style.animation = "pulseBurst 0.5s ease";
      setTimeout(() => {
        const p = sc.querySelector(".sc-pulse");
        if (p) p.style.animation = "";
      }, 500);
    });
  });
  // Add keyframe via JS
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    @keyframes pulseBurst {
      0%{opacity:0;transform:scale(0.8)}
      50%{opacity:0.15;transform:scale(1.1)}
      100%{opacity:0;transform:scale(1)}
    }
  `;
  document.head.appendChild(styleEl);


  /* ════════════════════════════════════
     ACTIVE NAV HIGHLIGHTING
  ════════════════════════════════════ */
  const sections = document.querySelectorAll("section[id]");
  const navAs = document.querySelectorAll(".nav-links a");
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAs.forEach(a => a.style.color = "");
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = "var(--blue)";
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObs.observe(s));


  /* ════════════════════════════════════
     CONTACT FORM — WITH FALLBACK
  ════════════════════════════════════ */
  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");
  const btnLabel = document.getElementById("btnLabel");

  // Simple client-side validation
  function validateForm(data) {
    if (!data.name || data.name.trim().length < 2) return "Please enter your name (min 2 characters).";
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) return "Please enter a valid email address.";
    if (!data.subject || data.subject.trim().length < 3) return "Please enter a subject (min 3 characters).";
    if (!data.message || data.message.trim().length < 10) return "Please enter a message (min 10 characters).";
    return null;
  }

  function showMsg(text, type) {
    if (!formMsg) return;
    formMsg.textContent = text;
    formMsg.className = "form-msg " + type;
    setTimeout(() => { formMsg.textContent = ""; formMsg.className = "form-msg"; }, 6000);
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name:    (form.elements["name"]?.value    || "").trim(),
        email:   (form.elements["email"]?.value   || "").trim(),
        subject: (form.elements["subject"]?.value || "").trim(),
        message: (form.elements["message"]?.value || "").trim(),
      };

      // Client validation first
      const validationError = validateForm(data);
      if (validationError) { showMsg("⚠ " + validationError, "err"); return; }

      // Show loading state
      if (btnLabel) btnLabel.textContent = "⏳ Sending...";
      const submitBtn = document.getElementById("submitBtn");
      if (submitBtn) submitBtn.disabled = true;

      // Check if we're on a real server (not file://) before trying API
      const isLocalFile = window.location.protocol === "file:";

      if (isLocalFile) {
        // Running without backend — simulate success + open mailto as fallback
        await new Promise(r => setTimeout(r, 1200)); // simulate delay
        showMsg("⚡ Message recorded! Since no server is running, opening your email app as backup.", "ok");
        form.reset();
        // Open mailto as fallback
        const mailto = `mailto:radhika@example.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
        setTimeout(() => window.open(mailto, "_self"), 1500);
      } else {
        // Try the real backend API
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: controller.signal,
          });
          clearTimeout(timeout);

          let json = {};
          try { json = await res.json(); } catch (_) {}

          if (res.ok && json.success) {
            showMsg("⚡ Message sent! I'll get back to you soon.", "ok");
            form.reset();
          } else {
            throw new Error(json.message || `Server error (${res.status}). Please email directly.`);
          }
        } catch (err) {
          if (err.name === "AbortError") {
            showMsg("⏱ Request timed out. Please try emailing directly.", "err");
          } else if (!navigator.onLine) {
            showMsg("📡 No internet connection. Please check your network.", "err");
          } else if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
            // Backend not running — fallback to mailto
            showMsg("⚡ Backend not running — opening your email app instead!", "ok");
            const mailto = `mailto:radhika@example.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
            setTimeout(() => window.open(mailto, "_self"), 1200);
            form.reset();
          } else {
            showMsg("✗ " + err.message, "err");
          }
        }
      }

      // Reset button
      if (btnLabel) btnLabel.textContent = "⚡ Send Message";
      if (submitBtn) submitBtn.disabled = false;
    });
  }

  /* ════════════════════════════════════
     TOUCH — DISABLE 3D TILT ON MOBILE
  ════════════════════════════════════ */
  const isTouchDevice = () => window.matchMedia("(hover: none)").matches;
  if (!isTouchDevice()) {
    document.querySelectorAll(".pj-card, .ach-card, .an-card, .cmd-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
        card.style.transition = "transform 0.1s ease";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.transition = "transform 0.4s ease";
      });
    });
  }

})();
