import "../sass/main.scss";
import * as data from "../data/photographers.json";
import Factory from "./Factory";

const factory = new Factory();
let membersJson = data.photographers;
let medias = data.media;

var url_string = window.location.href;
var url = new URL(url_string);
var memberId = url.searchParams.get("id");

const memberData = membersJson.find(
  (member) => member.id === parseInt(memberId)
);
let member = factory.createMember(memberData);

let memberMedias = medias.filter((media) => {
  return media.photographerId === parseInt(memberId);
});
member.medias = memberMedias;
console.log(member);

let htmlMemberPage = member.getMemberTemplate();

// chargement des photographes
function chargePage() {
  document.getElementById("main-div").innerHTML = htmlMemberPage;
}

// function addEventListenerToDifferentTagLink() {
//   const items = document.getElementsByClassName("tag-link");
//   for (const item of items) {
//     if (item.classList.contains("tag-portrait")) {
//       item.addEventListener("click", (e) => orderMembers(e, "portrait"));
//     } else if (item.classList.contains("tag-fashion")) {
//       item.addEventListener("click", (e) => orderMembers(e, "fashion"));
//     } else if (item.classList.contains("tag-art")) {
//       item.addEventListener("click", (e) => orderMembers(e, "art"));
//     } else if (item.classList.contains("tag-architecture")) {
//       item.addEventListener("click", (e) => orderMembers(e, "architecture"));
//     } else if (item.classList.contains("tag-travel")) {
//       item.addEventListener("click", (e) => orderMembers(e, "travel"));
//     } else if (item.classList.contains("tag-sports")) {
//       item.addEventListener("click", (e) => orderMembers(e, "sports"));
//     } else if (item.classList.contains("tag-animals")) {
//       item.addEventListener("click", (e) => orderMembers(e, "animals"));
//     } else if (item.classList.contains("tag-events")) {
//       item.addEventListener("click", (e) => orderMembers(e, "events"));
//     }
//   }
// }
// function orderMembers(e, tag) {
//   e.stopPropagation();
//   e.preventDefault();
//   switch (tag) {
//     case "portrait":
//       membersJson = data.photographers.filter(function (item) {
//         return item.tags.includes("portrait");
//       });

//       break;
//     case "fashion":
//       membersJson = data.photographers.filter(function (item) {
//         return item.tags.includes("fashion");
//       });

//       break;
//     case "art":
//       membersJson = data.photographers.filter(function (item) {
//         return item.tags.includes("art");
//       });

//       break;
//     case "architecture":
//       membersJson = data.photographers.filter(function (item) {
//         return item.tags.includes("architecture");
//       });

//       break;
//     case "travel":
//       membersJson = data.photographers.filter(function (item) {
//         return item.tags.includes("travel");
//       });

//       break;
//     case "sports":
//       membersJson = data.photographers.filter(function (item) {
//         return item.tags.includes("sports");
//       });

//       break;
//     case "animals":
//       membersJson = data.photographers.filter(function (item) {
//         return item.tags.includes("animals");
//       });

//       break;
//     case "events":
//       membersJson = data.photographers.filter(function (item) {
//         return item.tags.includes("events");
//       });

//       break;
//     default:
//       break;
//   }
//   chargeMembers();
//   addEventListenerToDifferentTagLink();
// }
// let mainY = document.querySelector(".main").offsetTop;

// // gestion du bouton apparaissant quand le scroll dépasse la balise main
document.addEventListener("DOMContentLoaded", function (event) {
  chargePage();
  //   addEventListenerToDifferentTagLink();
  //   window.addEventListener("scroll", function (e) {
  //     if (window.scrollY > mainY) {
  //       document.querySelector(".back-to-main-div").style.display = "flex";
  //     } else {
  //       document.querySelector(".back-to-main-div").style.display = "none";
  //     }
  //   });
});
