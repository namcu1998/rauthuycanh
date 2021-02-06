const btnShowMenu = document.getElementById("btn-show-menu");
const btnCloseMenu = document.getElementById("btn-close-menu");
const contentContainer = document.getElementsByClassName("content-container");
const content = document.getElementsByClassName("content");
const menu = document.getElementsByClassName("menu");
const btnShowInformation = document.getElementById("btn-show-information-esp");
const btnCloseInformation = document.getElementById("btn-close-information-esp");
const informationEsp = document.getElementsByClassName("information-esp");
const btnShowNotification = document.getElementById("btn-show-notification");
const btnCloseNotification = document.getElementById("btn-close-notification");
const notification = document.getElementsByClassName("information-sensor");
const btnShowAutomaticPage = document.getElementById("btn-show-automatic-page");
const btnShowControllPage = document.getElementById("btn-show-controll-page");
const btnShowHistoryPage = document.getElementById("btn-show-history-page");
const btnShowSearchPage = document.getElementById("btn-show-search-page");
const btnShowChartPage = document.getElementById("btn-show-chart-page");
const btnShowAutomaticPage1 = document.getElementById("btn-show-automatic-page1");
const btnShowControllPage1 = document.getElementById("btn-show-controll-page1");
const btnShowHistoryPage1 = document.getElementById("btn-show-history-page1");
const btnShowSearchPage1 = document.getElementById("btn-show-search-page1");
const btnShowChartPage1 = document.getElementById("btn-show-chart-page1");

btnShowMenu.addEventListener("click", () => {
  menu[0].style.left = "0";
  contentContainer[0].style.background = "rgb(0, 0, 0, 0.2)"
})
btnCloseMenu.addEventListener("click", () => {
  menu[0].style.left = "-100%";
  contentContainer[0].style.background = "rgb(0, 0, 0, 0)"
})
contentContainer[0].addEventListener("click", () => {
  notification[0].style.display = "none";
  informationEsp[0].style.right = "-100%";
  menu[0].style.left = "-100%";
  contentContainer[0].style.background = "rgb(0, 0, 0, 0)"
})

btnShowInformation.addEventListener("click", () => {
  informationEsp[0].style.right = "0";
  contentContainer[0].style.background = "rgb(0, 0, 0, 0.2)"
})

btnCloseInformation.addEventListener("click", () => {
  informationEsp[0].style.right = "-100%";
  contentContainer[0].style.background = "rgb(0, 0, 0, 0)"
})

btnShowNotification.addEventListener("click", () => {
  notification[0].style.display = "block";
  contentContainer[0].style.background = "rgb(0, 0, 0, 0.2)"
})

btnCloseNotification.addEventListener("click", () => {
  notification[0].style.display = "none";
  contentContainer[0].style.background = "rgb(0, 0, 0, 0)"
})

btnShowControllPage.addEventListener("click", () => {
  content[0].style.transform = "translateX(0)"
})

btnShowAutomaticPage.addEventListener("click", () => {
  content[0].style.transform = "translateX(-20%)"
})

btnShowHistoryPage.addEventListener("click", () => {
  content[0].style.transform = "translateX(-40%)"
})

btnShowSearchPage.addEventListener("click", () => {
  content[0].style.transform = "translateX(-60%)"
})

btnShowChartPage.addEventListener("click", () => {
  content[0].style.transform = "translateX(-80%)"
})

btnShowControllPage1.addEventListener("click", () => {
  content[0].style.transform = "translateX(0)"
})

btnShowAutomaticPage1.addEventListener("click", () => {
  content[0].style.transform = "translateX(-20%)"
})

btnShowHistoryPage1.addEventListener("click", () => {
  content[0].style.transform = "translateX(-40%)"
})

btnShowSearchPage1.addEventListener("click", () => {
  content[0].style.transform = "translateX(-60%)"
})

btnShowChartPage1.addEventListener("click", () => {
  content[0].style.transform = "translateX(-80%)"
})
