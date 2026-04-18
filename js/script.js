// ===== Helpers =====
const $ = (selector) => document.querySelector(selector);

// ===== Elements =====
const themeBtn = $("#themeBtn");
const greetingEl = $("#greeting");
const form = $("#contactForm");
const formMsg = $("#formMessage");

// ===== Greeting by time =====
if (greetingEl) {
  const hour = new Date().getHours();
  let msg = "Hello!";

  if (hour >= 5 && hour < 12) msg = "Good morning 🌅";
  else if (hour >= 12 && hour < 17) msg = "Good afternoon ☀️";
  else if (hour >= 17 && hour < 22) msg = "Good evening 🌙";
  else msg = "Good night 🌙";

  greetingEl.textContent = msg;
}

// ===== Theme toggle =====
if (themeBtn) {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.body.classList.add("dark");

  updateThemeIcon();

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  const isDark = document.body.classList.contains("dark");
  if (themeBtn) {
    themeBtn.textContent = isDark ? "☀️" : "🌙";
  }
}

// ===== Contact form =====
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = "Please fill in all fields.";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      formMsg.textContent = "Please enter a valid email.";
      return;
    }

    formMsg.textContent = `Thanks, ${name}! Your message is ready.`;
    form.reset();
  });
}

// ===== Search filter =====
const searchInput = $("#searchInput");
const projects = document.querySelectorAll(".project-card");
const noResults = $("#noResults");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    let visible = 0;

    projects.forEach((project) => {
      const text = project.getAttribute("data-project");

      if (text.includes(value)) {
        project.style.display = "block";
        visible++;
      } else {
        project.style.display = "none";
      }
    });

    if (noResults) {
      noResults.style.display = visible === 0 ? "block" : "none";
    }
  });
}