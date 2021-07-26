import "../sass/main.scss";
import * as data from "../data/photographers.json";
import Factory from "./Factory";
import "./memberModal"
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

let htmlMemberPage = member.getMemberTemplate();
let modalHtmlMember =  member.getModalTemplate();

// chargement des photographes
function chargePage() {
  document.getElementById("main-div").innerHTML = htmlMemberPage;
  document.getElementById("member-modal").innerHTML = modalHtmlMember;
}


document.addEventListener("DOMContentLoaded", function (event) {
  chargePage();
   // DOM Elements
   const modalbg = document.querySelector(".bground");
   const modalBtn = document.querySelectorAll(".modal-btn");
   const modalClose = document.querySelectorAll(".content .close");
   
   const formData = document.querySelectorAll(".formData");
   
   // launch modal event
   modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
   
   // close modal event
   modalClose.forEach((btn) => btn.addEventListener("click", closeModal));
   document.getElementById('confirmation-close').addEventListener("click", closeModal);
   
   // launch modal form
   function launchModal() {
     modalbg.style.display = "block";
     document.querySelector("#modal-form").style.display = "inherit";
     document.querySelector("#form-confirmation").style.display = "none";
   }
   
   // close modal form
   function closeModal() {
     modalbg.style.display = "none";
     document.querySelectorAll('.form-validation').forEach((element) => {
       element.innerText = "";
     });
   }
});
