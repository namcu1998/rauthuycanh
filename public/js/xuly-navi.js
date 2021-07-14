const btnShowMenu = document.getElementById("btn-show-menu");
const btnCloseMenu = document.getElementById("btn-close-menu");
const contentContainer = document.getElementsByClassName("content-container");
const content = document.getElementsByClassName("content");
const menu = document.getElementsByClassName("menu");
const btnShowInformation = document.getElementById("btn-show-information-esp");
const currentTheme = localStorage.getItem('theme');
const btnCloseInformation = document.getElementById(
  "btn-close-information-esp"
);
const btnChangeMode = document.getElementById("btn-change-mode");
const informationEsp = document.getElementsByClassName("information-esp");
const btnShowNotification = document.getElementById("btn-show-notification");
const btnCloseNotification = document.getElementById("btn-close-notification");
const notification = document.getElementsByClassName("information-sensor");
const btnShowAutomaticPage = document.getElementById("btn-show-automatic-page");
const btnShowControllPage = document.getElementById("btn-show-controll-page");
const btnShowHistoryPage = document.getElementById("btn-show-history-page");
const btnShowSearchPage = document.getElementById("btn-show-search-page");
const btnShowChartPage = document.getElementById("btn-show-chart-page");
let modeDark = currentTheme === "dark" ? true : false;
document.documentElement.setAttribute("data-theme", currentTheme);

btnChangeMode.addEventListener("click", () => {
  modeDark = !modeDark;
  btnChangeMode.src = modeDark === true ? "/image/sun.svg" : "/image/moon.png"
  document.documentElement.setAttribute("data-theme",  modeDark === true ? "dark" : "light");
  if(modeDark === true) {
    localStorage.setItem('theme', 'dark');
  }
  else localStorage.setItem('theme', 'light');
})

btnShowMenu.addEventListener("click", () => {
  menu[0].style.left = "0";
});
btnCloseMenu.addEventListener("click", () => {
  menu[0].style.left = "-100%";
});
contentContainer[0].addEventListener("click", () => {
  notification[0].style.display = "none";
  informationEsp[0].style.right = "-100%";
  menu[0].style.left = "-100%";
});

btnShowInformation.addEventListener("click", () => {
  informationEsp[0].style.right = "0";
});

btnCloseInformation.addEventListener("click", () => {
  informationEsp[0].style.right = "-100%";
});

btnShowNotification.addEventListener("click", () => {
  notification[0].style.display = "block";
});

btnCloseNotification.addEventListener("click", () => {
  notification[0].style.display = "none";
});

// const list = document.querySelectorAll(".list");
// console.log(list)

// function acctivePage() {
//   list.forEach(element => {
//     element.classList.remove("active");
//     this.classList.add("active");
//   })
// }

// list.forEach(element => {
//   console.log(element)
//   element.addEventListener("click", acctivePage);
// })

btnShowControllPage.addEventListener("click", () => {
  btnShowControllPage.classList.add("active");
  btnShowAutomaticPage.classList.remove("active");
  btnShowHistoryPage.classList.remove("active");
  btnShowSearchPage.classList.remove("active");
  btnShowChartPage.classList.remove("active");
  content[0].style.transform = "translateX(0)";
});

btnShowAutomaticPage.addEventListener("click", () => {
  btnShowAutomaticPage.classList.add("active");
  btnShowControllPage.classList.remove("active");
  btnShowHistoryPage.classList.remove("active");
  btnShowSearchPage.classList.remove("active");
  btnShowChartPage.classList.remove("active");
  content[0].style.transform = "translateX(-20%)";
});

btnShowHistoryPage.addEventListener("click", () => {
  btnShowHistoryPage.classList.add("active");
  btnShowControllPage.classList.remove("active");
  btnShowAutomaticPage.classList.remove("active");
  btnShowSearchPage.classList.remove("active");
  btnShowChartPage.classList.remove("active");
  content[0].style.transform = "translateX(-40%)";
});

btnShowSearchPage.addEventListener("click", () => {
  btnShowSearchPage.classList.add("active");
  btnShowControllPage.classList.remove("active");
  btnShowAutomaticPage.classList.remove("active");
  btnShowHistoryPage.classList.remove("active");
  btnShowChartPage.classList.remove("active");
  content[0].style.transform = "translateX(-60%)";
});

btnShowChartPage.addEventListener("click", () => {
  btnShowChartPage.classList.add("active");
  btnShowControllPage.classList.remove("active");
  btnShowAutomaticPage.classList.remove("active");
  btnShowHistoryPage.classList.remove("active");
  btnShowSearchPage.classList.remove("active");
  content[0].style.transform = "translateX(-80%)";
});
