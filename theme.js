//* Selectors
const themeToggle = document.querySelector("#theme-toggle");
const body = document.body;

//* loading saved prefrences from localStorage!
const saved = localStorage.getItem("theme");
if(saved) {
    body.setAttribute("data-theme", saved);
    themeToggle.textContent = saved === "dark" ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
    const isDark = body.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    body.setAttribute("data-theme", next);
    themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", next);
})