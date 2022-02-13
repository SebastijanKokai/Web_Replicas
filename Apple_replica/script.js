const body = document.querySelector("body");
const menuBar = document.getElementById("menu-bar");
const mainMenu = document.getElementById("main-menu");

menuBar.addEventListener("click", () => {
  mainMenu.classList.toggle("active");
  body.classList.toggle("active");

  if (mainMenu.classList.contains("active")) {
    menuBar.innerHTML = `
  <i class="fas fa-times"></i>
  `;
  } else {
    menuBar.innerHTML = `
    <i class="fas fa-bars"></i>
  `;
  }
});

window.onresize = () => {
  if (window.matchMedia("(min-width: 840px)").matches) {
    mainMenu.classList.remove("active");
    body.classList.remove("active");
    menuBar.innerHTML = `
    <i class="fas fa-bars"></i>
  `;
  }
};
