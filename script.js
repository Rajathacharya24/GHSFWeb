const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuButton.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});
// Language Toggle Interactivity
const langToggleBtn = document.getElementById("lang-toggle");
let currentLang = "kn"; // default is Kannada

langToggleBtn.addEventListener("click", () => {
  if (currentLang === "kn") {
    currentLang = "en";
    langToggleBtn.textContent = "ಕನ್ನಡ";
    document.querySelectorAll(".lang-kn").forEach(el => el.style.display = "none");
    document.querySelectorAll(".lang-en").forEach(el => {
      if (el.tagName === "SPAN" || el.tagName === "STRONG") {
        el.style.display = "inline";
      } else {
        el.style.display = "block";
      }
    });
  } else {
    currentLang = "kn";
    langToggleBtn.textContent = "English";
    document.querySelectorAll(".lang-en").forEach(el => el.style.display = "none");
    document.querySelectorAll(".lang-kn").forEach(el => {
      if (el.tagName === "SPAN" || el.tagName === "STRONG") {
        el.style.display = "inline";
      } else {
        el.style.display = "block";
      }
    });
  }
});

// Interactive statistics counter animation
const statsSection = document.querySelector(".stats-band");
const statNumbers = statsSection.querySelectorAll("strong");

const animateStats = () => {
  statNumbers.forEach(stat => {
    const targetText = stat.textContent.trim();
    // Check if it's a clean number or has characters like +, %, :
    const valueMatch = targetText.match(/^([0-9]+)/);
    if (!valueMatch) return;

    const targetValue = parseInt(valueMatch[1], 10);
    const suffix = targetText.replace(valueMatch[1], "");

    let startValue = 0;
    const duration = 1500; // 1.5s animation
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const currentValue = Math.floor(easeProgress * targetValue);

      stat.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = targetText; // Ensure exact final value
      }
    };

    requestAnimationFrame(updateCount);
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  observer.observe(statsSection);
}

