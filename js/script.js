// ===== Helpers =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===== Elements =====
const themeBtn = $("#themeBtn");
const greetingEl = $("#greeting");
const form = $("#contactForm");
const formMsg = $("#formMessage");

const searchInput = $("#searchInput");
const projects = $$(".project-card");
const noResults = $("#noResults");

const repoBtn = $("#repoBtn");
const repoList = $("#repoList");
const repoError = $("#repoError");

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

// ===== Theme toggle with localStorage =====
if (themeBtn) {
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    document.body.classList.add("dark");
  }

  updateThemeIcon();

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  if (!themeBtn) return;
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
}

// ===== Contact form with stronger checks =====
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = "Please fill in all fields.";
      formMsg.style.color = "red";
      return;
    }

    if (name.length < 2) {
      formMsg.textContent = "Name must be at least 2 characters long.";
      formMsg.style.color = "red";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      formMsg.textContent = "Please enter a valid email address.";
      formMsg.style.color = "red";
      return;
    }

    if (message.length < 10) {
      formMsg.textContent = "Message must be at least 10 characters long.";
      formMsg.style.color = "red";
      return;
    }

    formMsg.textContent = `Thanks, ${name}! Your message has been sent successfully.`;
    formMsg.style.color = "green";
    form.reset();
  });
}

// ===== Search filter =====
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();
    let visible = 0;

    projects.forEach((project) => {
      const text = project.getAttribute("data-project").toLowerCase();

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

// ===== GitHub API Feature =====
async function loadRepositories() {
  if (!repoList || !repoError) return;

  repoList.innerHTML = "<p>Loading repositories...</p>";
  repoError.textContent = "";

  try {
    const response = await fetch("https://api.github.com/users/dalivxs/repos?sort=updated");

    if (!response.ok) {
      throw new Error("Failed to fetch repositories.");
    }

    const repos = await response.json();

    if (!repos.length) {
      repoList.innerHTML = "<p>No repositories found.</p>";
      return;
    }

    const topRepos = repos.slice(0, 5);

    repoList.innerHTML = topRepos
      .map(
        (repo) => `
          <div class="project-card">
            <h3>${repo.name}</h3>
            <p>${repo.description ? repo.description : "No description available."}</p>
            <div class="project-buttons">
              <a href="${repo.html_url}" target="_blank" class="btn-outline">View on GitHub</a>
            </div>
          </div>
        `
      )
      .join("");
  } catch (error) {
    repoList.innerHTML = "";
    repoError.textContent = "Could not load repositories right now. Please try again later.";
  }
}

if (repoBtn) {
  repoBtn.addEventListener("click", loadRepositories);
}