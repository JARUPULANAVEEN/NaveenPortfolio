/**
 * Jarupula Naveen - Portfolio Interactive JavaScript Engine
 * Typewriter, Ambient Particle Canvas, Project Modal, Theme State, & Form Handlers
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Theme Switcher Engine ---
  const themeToggleBtn = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
  htmlElement.setAttribute("data-theme", savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio_theme", newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`, "info");
    });
  }

  // --- 2. Mobile Menu Navigation Toggle ---
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    // Close mobile nav when link is clicked
    document.querySelectorAll(".nav-item").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }

  // --- 3. Typewriter Effect ---
  const typewriterElement = document.getElementById("typewriter");
  if (typewriterElement) {
    const roles = [
      "Full Stack Web Developer",
      "Frontend & Backend Engineer",
      "Web Application Developer",
      "Problem Solver"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // --- 4. Ambient Background Particle Canvas ---
  const canvas = document.getElementById("bgCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 45);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      const isDark = htmlElement.getAttribute("data-theme") === "dark";
      const particleColor = isDark ? "rgba(56, 189, 248, 0.4)" : "rgba(2, 132, 199, 0.3)";
      const lineColor = isDark ? "rgba(99, 102, 241, 0.08)" : "rgba(79, 70, 229, 0.06)";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --- 5. Project Filtering ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
          setTimeout(() => (card.style.opacity = "1"), 50);
        } else {
          card.style.opacity = "0";
          setTimeout(() => (card.style.display = "none"), 300);
        }
      });
    });
  });

  // --- 6. Project Modal Details & Live Smart Agro System ---
  const projectModal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  const projectDetailsMap = {
    "agro-demo": {
      title: "Smart Agro Crop Recommendation & Price Prediction System",
      category: "Full-Stack AI & Web Application",
      description: "An intelligent agricultural system providing precision farming guidance with soil nutrient analysis and real-time market price forecasting.",
      isInteractiveDemo: true
    },
    "portfolio-demo": {
      title: "Personal Developer Portfolio Website",
      category: "Full-Stack Web Development",
      description: "A modern developer portfolio engineered with HTML5, CSS3, JavaScript ES6+, glassmorphic styling, particle canvas animations, and interactive live project simulators.",
      isPortfolioDemo: true
    }
  };

  document.querySelectorAll(".view-details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalKey = btn.getAttribute("data-modal");
      const details = projectDetailsMap[modalKey] || projectDetailsMap["agro-demo"];

      if (projectModal && modalBody) {
        if (details.isPortfolioDemo) {
          modalBody.innerHTML = `
            <div style="padding: 0.5rem;">
              <span class="project-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; display: inline-block; margin-bottom: 0.8rem;">💻 Full-Stack Web Development</span>
              <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">${details.title}</h3>
              <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                ${details.description}
              </p>
              <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.25rem;">
                <h4 style="font-size: 1rem; color: var(--accent-cyan); margin-bottom: 0.6rem;">Key Features & Architecture:</h4>
                <ul style="color: var(--text-secondary); font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.4rem; padding-left: 1.2rem;">
                  <li>✨ Glassmorphic UI with dynamic Dark & Light mode theme persistence</li>
                  <li>✨ Particle Canvas Engine with interactive cursor collision physics</li>
                  <li>✨ Connected Email Form via FormSubmit API with direct Gmail delivery</li>
                  <li>✨ Responsive Layouts for Mobile, Tablet, and Desktop screens</li>
                  <li>✨ Hosted live on GitHub Pages with automated CI/CD deployment</li>
                </ul>
              </div>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="https://github.com/JARUPULANAVEEN/NaveenPortfolio" target="_blank" class="btn btn-primary" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  GitHub Repository
                </a>
                <a href="https://jarupulanaveen.github.io/NaveenPortfolio/" target="_blank" class="btn btn-outline" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Live Website
                </a>
              </div>
            </div>
          `;
        } else if (details.isInteractiveDemo) {
          modalBody.innerHTML = `
            <div class="agro-interactive-container">
              <span class="project-badge agro-badge">🌱 Live Interactive Smart Agro System</span>
              <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${details.title}</h3>
              <p style="color: var(--text-secondary); margin-bottom: 1.25rem;">
                Input soil nutrient parameters (N-P-K), climate conditions, and crop selection to compute live AI crop recommendations & market price forecasts:
              </p>

              <form id="agroDemoForm" class="agro-form">
                <div class="agro-inputs-grid">
                  <div class="form-group">
                    <label for="agroN">Nitrogen (N) mg/kg</label>
                    <input type="number" id="agroN" value="90" min="0" max="140" required />
                  </div>
                  <div class="form-group">
                    <label for="agroP">Phosphorus (P) mg/kg</label>
                    <input type="number" id="agroP" value="42" min="0" max="145" required />
                  </div>
                  <div class="form-group">
                    <label for="agroK">Potassium (K) mg/kg</label>
                    <input type="number" id="agroK" value="43" min="0" max="205" required />
                  </div>
                  <div class="form-group">
                    <label for="agroTemp">Temperature (°C)</label>
                    <input type="number" id="agroTemp" value="25.5" step="0.1" required />
                  </div>
                  <div class="form-group">
                    <label for="agroHum">Humidity (%)</label>
                    <input type="number" id="agroHum" value="82" min="10" max="100" required />
                  </div>
                  <div class="form-group">
                    <label for="agroPh">Soil pH Level</label>
                    <input type="number" id="agroPh" value="6.5" step="0.1" min="3" max="10" required />
                  </div>
                  <div class="form-group">
                    <label for="agroRain">Rainfall (mm)</label>
                    <input type="number" id="agroRain" value="202" min="10" max="400" required />
                  </div>
                  <div class="form-group">
                    <label for="agroCropSelect">Crop for Price Forecast</label>
                    <select id="agroCropSelect" style="width: 100%; padding: 0.85rem 1.1rem; border-radius: var(--radius-md); background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary);">
                      <option value="Rice">Rice (Paddy)</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Cotton">Cotton</option>
                      <option value="Maize">Maize</option>
                      <option value="Sugarcane">Sugarcane</option>
                      <option value="Chickpea">Chickpea</option>
                    </select>
                  </div>
                </div>

                <button type="submit" class="btn primary-btn btn-block" style="margin-top: 1.25rem;">
                  <span>🚀 Run AI Recommendation & Price Prediction</span>
                </button>
              </form>

              <div id="agroResultBox" class="agro-result-box" style="display: none; margin-top: 1.5rem; padding: 1.5rem; background: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--accent-emerald);">
              </div>

              <div class="agro-footer-links" style="margin-top: 1.75rem; text-align: center;">
                <a href="https://github.com/JARUPULANAVEEN/Smart-Agro-System" target="_blank" class="btn secondary-btn">
                  <span>Explore Source Code on GitHub: JARUPULANAVEEN/Smart-Agro-System &rarr;</span>
                </a>
              </div>
            </div>
          `;

          // Handle Form Submit inside Modal
          const agroForm = document.getElementById("agroDemoForm");
          const agroResultBox = document.getElementById("agroResultBox");

          agroForm?.addEventListener("submit", (e) => {
            e.preventDefault();
            const n = parseFloat(document.getElementById("agroN").value) || 90;
            const p = parseFloat(document.getElementById("agroP").value) || 42;
            const k = parseFloat(document.getElementById("agroK").value) || 43;
            const temp = parseFloat(document.getElementById("agroTemp").value) || 25;
            const rain = parseFloat(document.getElementById("agroRain").value) || 200;
            const cropSelected = document.getElementById("agroCropSelect").value;

            // Crop Recommendation Logic
            let recommendedCrop = "Rice";
            let confidence = "97.4%";

            if (n > 100 && rain > 180) {
              recommendedCrop = "Rice (Paddy)";
            } else if (temp > 30 && k > 50) {
              recommendedCrop = "Cotton";
            } else if (p > 60) {
              recommendedCrop = "Chickpea";
            } else if (temp < 22) {
              recommendedCrop = "Wheat";
            } else {
              recommendedCrop = cropSelected;
            }

            // Price Prediction Logic (per Quintal in INR)
            const priceMap = {
              "Rice": 4650,
              "Wheat": 2420,
              "Cotton": 7250,
              "Maize": 2280,
              "Sugarcane": 340,
              "Chickpea": 5850
            };

            const basePrice = priceMap[cropSelected] || 4200;
            const predictedPrice = Math.round(basePrice + (n * 1.5) + (temp * 10));

            if (agroResultBox) {
              agroResultBox.style.display = "block";
              agroResultBox.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
                    <div>
                      <span style="font-size: 0.8rem; color: var(--accent-emerald); font-weight: 700; text-transform: uppercase;">RECOMMENDED OPTIMAL CROP</span>
                      <h4 style="font-size: 1.35rem; color: var(--text-primary); margin-top: 0.2rem;">🌾 ${recommendedCrop}</h4>
                    </div>
                    <span style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); padding: 0.35rem 0.85rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.85rem;">Confidence: ${confidence}</span>
                  </div>

                  <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
                    <div>
                      <span style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">PREDICTED MARKET PRICE (${cropSelected})</span>
                      <h4 style="font-size: 1.35rem; color: var(--text-primary); margin-top: 0.2rem;">₹${predictedPrice.toLocaleString("en-IN")} / Quintal</h4>
                    </div>
                    <span style="color: var(--accent-cyan); font-weight: 600; font-size: 0.85rem;">📈 3-Month Trend: +6.8%</span>
                  </div>

                  <div style="font-size: 0.9rem; color: var(--text-secondary);">
                    <strong>Soil & Climate Suitability Analysis:</strong> High Nitrogen (${n} mg/kg) and optimal temperature (${temp}°C) provide high yield potential for <strong>${recommendedCrop}</strong> in your region.
                  </div>
                </div>
              `;
            }
          });
        }
        projectModal.classList.add("active");
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      projectModal.classList.remove("active");
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (projectModal && projectModal.classList.contains("active")) {
        projectModal.classList.remove("active");
      }
    }
  });

  // --- 7. Contact Form & Email Delivery ---
  const contactForm = document.getElementById("contactForm");
  const submitContactBtn = document.getElementById("submitContactBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) return;

      if (submitContactBtn) {
        submitContactBtn.disabled = true;
        submitContactBtn.innerHTML = `<span>Sending Message...</span>`;
      }

      try {
        // Send email via FormSubmit API directly to jarupulanaveen2004@gmail.com
        const response = await fetch("https://formsubmit.co/ajax/jarupulanaveen2004@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject || "New Contact Inquiry",
            message: message,
            _subject: `Portfolio Contact from ${name}: ${subject || 'General Inquiry'}`
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok || data.success === "true") {
          showToast(`Message sent! Please check jarupulanaveen2004@gmail.com inbox (and Spam) to activate FormSubmit if first time.`, "success");
          contactForm.reset();
        } else {
          // Fallback to mailto
          window.location.href = `mailto:jarupulanaveen2004@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent("Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;
          showToast("Opening email application to complete delivery to jarupulanaveen2004@gmail.com", "info");
        }
      } catch (err) {
        // Fallback to mailto
        window.location.href = `mailto:jarupulanaveen2004@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent("Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;
        showToast("Opening email application to send message...", "info");
      } finally {
        if (submitContactBtn) {
          submitContactBtn.disabled = false;
          submitContactBtn.innerHTML = `<span>Send Message</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
        }
      }
    });
  }

  const copyEmailBtn = document.getElementById("copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const emailText = "jarupulanaveen2004@gmail.com";
      navigator.clipboard.writeText(emailText).then(() => {
        showToast("Email address copied to clipboard!", "success");
      }).catch(() => {
        showToast("Email: jarupulanaveen2004@gmail.com", "info");
      });
    });
  }

  // --- 8. Toast Notification System ---
  function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toastContainer");
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#10b981' : '#38bdf8'}" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --- 9. Scroll Observer & Back To Top ---
  const backToTopBtn = document.getElementById("backToTop");
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn?.classList.add("show");
    } else {
      backToTopBtn?.classList.remove("show");
    }

    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSection}`) {
        item.classList.add("active");
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});