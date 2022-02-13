const navBar = document.getElementById("nav");
const containerNav = document.getElementById("container");
const burgerMenu = document.getElementById("burger-menu");
const drawerMenu = document.getElementById("drawer-menu");

const titleScreenDetails = document.querySelectorAll(".screen-details h1");
const buttonScreenDetails = document.querySelectorAll(".screen-details .btn");

let previousScrollPosition = 0;
window.onscroll = () => {
  if (drawerMenu.classList.contains("active")) {
    drawerMenu.classList.remove("active");
  }
  let currentScrollPosition = document.documentElement.scrollTop;
  if (previousScrollPosition < currentScrollPosition) {
    containerNav.style.opacity = "0";
    document.documentElement.style.setProperty("--transform-property", "-100%");

    if (currentScrollPosition > 800 && currentScrollPosition < 1600) {
      titleScreenDetails[1].classList.add("animate-screen-title");
      buttonScreenDetails[1].classList.add("animate-screen-button");
    } else if (currentScrollPosition > 1600 && currentScrollPosition < 2400) {
      titleScreenDetails[2].classList.add("animate-screen-title");
      buttonScreenDetails[2].classList.add("animate-screen-button");
    } else if (currentScrollPosition > 2400 && currentScrollPosition < 3200) {
      titleScreenDetails[3].classList.add("animate-screen-title");
      buttonScreenDetails[3].classList.add("animate-screen-button");
    } else if (currentScrollPosition > 3200 && currentScrollPosition < 4000) {
      titleScreenDetails[4].classList.add("animate-screen-title");
      buttonScreenDetails[4].classList.add("animate-screen-button");
    }
  } else {
    containerNav.style.opacity = "1";
    if (currentScrollPosition > 800) {
      document.documentElement.style.setProperty("--transform-property", "0");
    } else {
      document.documentElement.style.setProperty(
        "--transform-property",
        "-100%"
      );
      console.log(currentScrollPosition);
    }
  }
  previousScrollPosition = currentScrollPosition;
  //   console.log(currentScrollPosition);
};

burgerMenu.addEventListener("click", () => {
  drawerMenu.classList.toggle("active");
});
