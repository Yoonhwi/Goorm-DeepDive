const toggleDarkModeBtn = document.querySelector(".darkmode-btn");

document.onload = setInitialTheme(localStorage.getItem("theme"));
function setInitialTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("darkTheme");
  } else {
    document.documentElement.classList.remove("darkTheme");
  }
}

toggleDarkModeBtn.addEventListener("click", () => {
  if (document.documentElement.classList.contains("darkTheme")) {
    document.documentElement.classList.remove("darkTheme");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("darkTheme");
    localStorage.setItem("theme", "dark");
  }
});
