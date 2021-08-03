import "../sass/main.scss";
import * as data from "../data/photographers.json";
import Factory from "./Factory";

const factory = new Factory();
let membersJson = data.photographers;
let mediaJson = data.media;
let medias = [];
for (let i = 0; i < mediaJson.length; i++) {
  medias.push(factory.createMedia(mediaJson[i]));
}
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
let mediaCounter = memberMedias.length;

// chargement des photographes
function chargeMainDiv() {
  let htmlMedias = "";
  let photoPlaceInList = 0;
  for (const media of memberMedias) {
    photoPlaceInList += 1;
    htmlMedias += media.getMediaTemplate(photoPlaceInList, member.name);
    member.likes += media.likes;
  }
  let htmlMemberPage = member.getMemberTemplate(htmlMedias);
  let modalHtmlMember = member.getModalTemplate();
  document.getElementById("main-div").innerHTML = htmlMemberPage;
  document.getElementById("member-modal").innerHTML = modalHtmlMember;
}

// form checking and errors
function checkFields() {
  let errorMessages = {
    "first-name":
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom",
    "last-name": "Veuillez entrer 2 caractères ou plus pour le champ du nom",
    email: "Veuillez entrer une adresse email valide",
    message: "Veuillez entrer un message valide",
  };

  let fieldRegexs = {
    "first-name": "\\w{2,}",
    "last-name": "\\w{2,}",
    email: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)$",
    message: "\\w{2,}",
  };

  let formValidationsResults = [];
  let formValid = true;

  function fieldValidation(fieldName) {
    let regex = new RegExp(fieldRegexs[fieldName]);
    if (regex.test(document.getElementById(fieldName).value)) {
      document.getElementById(fieldName + "-validation").innerText = "";
      formValidationsResults[fieldName] = true;
    } else {
      document.getElementById(fieldName + "-validation").innerText =
        errorMessages[fieldName];
      formValidationsResults[fieldName] = false;
    }
  }

  // fonction appelée lors du submit du formulaire
  function onSubmit(e) {
    formValid = true;
    e.preventDefault();
    fieldValidation("first-name");
    fieldValidation("last-name");
    fieldValidation("email");
    fieldValidation("message");
    for (const [key, value] of Object.entries(formValidationsResults)) {
      if (value === false) {
        formValid = false;
      }
    }
    if (formValid) {
      document.querySelector("#modal-form").style.display = "none";
      document.querySelector("#form-confirmation").style.display = "flex";
    }
  }

  document.getElementById("modal-form").addEventListener("submit", onSubmit);
}

// open and close modal
function chargeModal() {
  // DOM Elements
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const modalClose = document.querySelectorAll(".content .close");

  const formData = document.querySelectorAll(".formData");

  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  // close modal event
  modalClose.forEach((btn) => btn.addEventListener("click", closeModal));
  document
    .getElementById("confirmation-close")
    .addEventListener("click", closeModal);
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      closeModal();
      // close lightbox too if oppened
      document.querySelector(".lightbox-modal").style.display = "none";
    }
  })
  

  // launch modal form
  function launchModal() {
    modalbg.style.display = "flex";
    document.querySelector("#modal-form").style.display = "inherit";
    document.querySelector("#form-confirmation").style.display = "none";
    document.querySelector("#first-name").focus();
  }

  // close modal form
  function closeModal() {
    modalbg.style.display = "none";
    document.querySelectorAll(".form-validation").forEach((element) => {
      element.innerText = "";
    });
  }
  
}

//fixed likesandprices
function chargesLikesAndPriceDiv() {
  let likesAndPriceHtml = `
    <div class="likes" id="likes"><span id="member-total-likes">${member.likes}</span><img src="../images/icons/heart_black.svg"/></div>
    <div class="price" id="price">${member.price}€/jour</div>
  `;
  document.getElementById("likes-and-price").innerHTML = likesAndPriceHtml;
}

// like photo event
function addLikeCounterEvent() {
  for (const item of document.getElementsByClassName("like-photo-button")) {
    let itemClasses = [];
    for (let value of item.classList.values()) {
      itemClasses.push(value);
    }
    let itemId = itemClasses
      .filter((el) => el.includes("like-photo-button-"))[0]
      .split("like-photo-button-")[1];
    item.addEventListener("click", function () {
      document.getElementById("member-total-likes").innerText = parseInt(
        parseInt(document.getElementById("member-total-likes").textContent) + 1
      );
      document.querySelector(".like-counter-" + itemId).innerText =
        parseInt(
          document.querySelector(".like-counter-" + itemId).textContent
        ) + 1;
    });
  }
}

function orderList() {
  function openOrderChoices() {
    document.querySelectorAll(".order-element--active").forEach((e) => {
      e.addEventListener("click", function () {
        if (document.querySelector(".order-oppened").style.display === "flex") {
          document.querySelector(".order-oppened").style.display = "none";
        } else {
          document.querySelector(".order-oppened").style.display = "flex";
        }
      });
    });
  }
  function orderPhotos() {
    document.querySelectorAll(".order-element--inactive").forEach((el) => {
      el.addEventListener("click", () => {
        let id = el.id;
        switch (id) {
          case "order-date":
            memberMedias.sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            });

            recharge();
            changeOrderlistAfter("date");
            orderList();
            break;
          case "order-popularity":
            memberMedias.sort((a, b) => (a.likes < b.likes ? 1 : -1));
            recharge();
            changeOrderlistAfter("popularity");
            orderList();
            break;
          case "order-title":
            memberMedias.sort((a, b) => (a.title > b.title ? 1 : -1));
            recharge();
            changeOrderlistAfter("title");
            orderList();
            break;
          default:
            break;
        }
      });
    });
  }
  function changeOrderlistAfter(choice) {
    let templateOrderChoices = "";
    switch (choice) {
      case "date":
        templateOrderChoices = `
            <span id="ordering-label">Trier par</span>
            <div class= "order-collapse" id="">
              <button class="order-element order-element--active">Date<img class="arrow" src="../images/icons/chevron-down-solid.svg"/></button>
              <div class= "order-oppened" role="listbox" aria-activedescendant aria-selected aria-labelledby="ordering-label">
                <button class="order-element order-element--active" id="order-date">Date<img class="arrow" src="../images/icons/chevron-up-solid.svg"/></button>
                <button class="order-element order-element--inactive" id="order-popularity">Popularité</button>
                <button class="order-element order-element--inactive" id="order-title">Titre</button>
              </div>
            </div>
        `;
        break;
      case "title":
        templateOrderChoices = `
            <span class="ordering-label">Trier par</span>
            <div class= "order-collapse" id="">
              <button class="order-element order-element--active">Titre<img class="arrow" src="../images/icons/chevron-down-solid.svg"/></button>
              <div class= "order-oppened" role="listbox" aria-activedescendant aria-selected aria-labelledby="ordering-label">
                <button class="order-element order-element--active" id="order-title">Titre<img class="arrow" src="../images/icons/chevron-up-solid.svg"/></button>
                <button class="order-element order-element--inactive" id="order-popularity">Popularité</button>
                <button class="order-element order-element--inactive" id="order-date">Date</button>
              </div>
            </div>
        `;
        break;
      case "popularity":
        templateOrderChoices = `
            <span class="ordering-title">Trier par</span>
            <div class= "order-collapse" id="">
              <button class="order-element order-element--active">Popularité<img class="arrow" src="../images/icons/chevron-down-solid.svg"/></button>
              <div class= "order-oppened" role="listbox" aria-activedescendant aria-selected aria-labelledby="ordering-label">
                <button class="order-element order-element--active" id="order-popularité">Popularité<img class="arrow" src="../images/icons/chevron-up-solid.svg"/></button>
                <button class="order-element order-element--inactive" id="order-title">Titre</button>
                <button class="order-element order-element--inactive" id="order-date">Date</button>
              </div>
            </div>
        `;
        break;
      default:
        break;
    }
    document.querySelector(".list-ordering").innerHTML = templateOrderChoices;
  }
  openOrderChoices();
  orderPhotos();
}
function openLightbox() {
  //open modal lightbox
  document.querySelectorAll(".item-image-tag").forEach((el) => {
    let elementType = el.tagName;

    if (elementType === "IMG") {
      let source = el.getAttribute("src");
      let photoPlaceInList = el.getAttribute("data-placeinlist");
      el.addEventListener("click", function () {
        let titleSelector = `.image-title--${photoPlaceInList}`;
        let titleContent = document.querySelector(titleSelector).textContent;
        document.querySelector(".lightbox-modal").style.display = "flex";
        document.querySelector(
          ".lightbox-image-tag"
        ).innerHTML = ` <img  tabindex="0" src="${source}" class="current-lightbox-image" data-placeInList="${photoPlaceInList}" alt="${titleContent}">`;

        document.querySelector(".lightbox-image-title").innerText =
          titleContent;
          document.querySelector('.current-lightbox-image').focus();
      });
      el.addEventListener("keydown", function (e) {
        if(e.which === 13){
          let titleSelector = `.image-title--${photoPlaceInList}`;
          let titleContent = document.querySelector(titleSelector).textContent;
          document.querySelector(".lightbox-modal").style.display = "flex";
          document.querySelector(
            ".lightbox-image-tag"
          ).innerHTML = ` <img  tabindex="0" src="${source}" class="current-lightbox-image" data-placeInList="${photoPlaceInList}" alt="${titleContent}">`;

          document.querySelector(".lightbox-image-title").innerText =
            titleContent;
          document.querySelector('.current-lightbox-image').focus();  
        }
      });
      ;
    } else {
      let source = el.querySelector("source").getAttribute("src");
      let photoPlaceInList = el.getAttribute("data-placeinlist");
      el.addEventListener("click", function () {
        let titleSelector = `.image-title--${photoPlaceInList}`;
        let titleContent = document.querySelector(titleSelector).textContent;
        document.querySelector(".lightbox-modal").style.display = "flex";
        document.querySelector(
          ".lightbox-image-tag"
        ).innerHTML = ` <video  tabindex="0" controls class="current-lightbox-image" data-placeInList="${photoPlaceInList}">
        <source src="${source}"
        <video/>
        `;

        document.querySelector(".lightbox-image-title").innerText =
          titleContent;
          document.querySelector('.current-lightbox-image').focus();
      });
      el.addEventListener("keydown", function (e) {
        if(e.which === 13){
          let titleSelector = `.image-title--${photoPlaceInList}`;
        let titleContent = document.querySelector(titleSelector).textContent;
        document.querySelector(".lightbox-modal").style.display = "flex";
        document.querySelector(
          ".lightbox-image-tag"
        ).innerHTML = ` <video  tabindex="0" controls class="current-lightbox-image" data-placeInList="${photoPlaceInList}">
        <source src="${source}"
        <video/>
        `;

        document.querySelector(".lightbox-image-title").innerText =
          titleContent;
        document.querySelector('.current-lightbox-image').focus();
        }
      });
      
    }
  });
}
// LIGHTBOX
function chargeLightBox() {
  //close modal lightbox
  document.querySelector(".close-lightbox").addEventListener("click", () => {
    document.querySelector(".lightbox-modal").style.display = "none";
  });

  // previous modal lightbox
  document.querySelector(".previous-lightbox").addEventListener("click", () => {
    let photoPlaceInList = document
      .querySelector(".current-lightbox-image")
      .getAttribute("data-placeinlist");
    let previousPlaceInList =
      parseInt(photoPlaceInList) - 1 < 1
        ? mediaCounter
        : parseInt(photoPlaceInList) - 1;
    let searchedAttribute = `[data-placeInList='${previousPlaceInList}']`;
    let previousItem = memberMedias[previousPlaceInList-1];
    let previousMediaElement = document.querySelector(searchedAttribute);
    // if previous media is an image
    if (previousMediaElement.tagName === "IMG") {
      let previousMediaSource = document
        .querySelector(searchedAttribute)
        .getAttribute("src");
      document.querySelector(
        ".lightbox-image-tag"
      ).innerHTML = ` <img tabindex="0" src="${previousMediaSource}" class="current-lightbox-image" data-placeInList="${previousPlaceInList}" alt="${previousItem.title}">`;
    } else {
      // if previous media is a video
      let previousMediaSource = document
        .querySelector(searchedAttribute)
        .querySelector("source")
        .getAttribute("src");
      document.querySelector(
        ".lightbox-image-tag"
      ).innerHTML = ` <video tabindex="0" class="current-lightbox-image" data-placeInList="${previousPlaceInList}" alt="${previousItem.title}">
        <source src="${previousMediaSource}"
        <video/>
        `;
    }
    let titleSelector = `.image-title--${previousPlaceInList}`;
    document.querySelector(".lightbox-image-title").innerText =
      document.querySelector(titleSelector).textContent;
      document.querySelector('.current-lightbox-image').focus();
  });
  //previous modal lightbox keyboard
  

  // next modal lightbox
  document
    .querySelector(".next-lightbox")
    .addEventListener("click", nextLightBoxHandler);
  function nextLightBoxHandler() {
    
    let photoPlaceInList = document
      .querySelector(".current-lightbox-image")
      .getAttribute("data-placeinlist");
    let nextPlaceInList =
      parseInt(photoPlaceInList) + 1 > mediaCounter
        ? 1
        : parseInt(photoPlaceInList) + 1;
    let nextItem = memberMedias[nextPlaceInList-1];
    console.log(nextItem);
    let searchedAttribute = `[data-placeInList='${nextPlaceInList}']`;
    let nextMediaElement = document.querySelector(searchedAttribute);
    // if next media is an image
    if (nextMediaElement.tagName === "IMG") {
      let nextMediaSource = document
        .querySelector(searchedAttribute)
        .getAttribute("src");
      document.querySelector(
        ".lightbox-image-tag"
      ).innerHTML = ` <img tabindex="0" src="${nextMediaSource}" class="current-lightbox-image" data-placeInList="${nextPlaceInList}" alt="${nextItem.title}">`;
    } else {
      // if next media is a video
      let nextMediaSource = document
        .querySelector(searchedAttribute)
        .querySelector("source")
        .getAttribute("src");
      document.querySelector(
        ".lightbox-image-tag"
      ).innerHTML = ` <video tabindex="0" class="current-lightbox-image" data-placeInList="${nextPlaceInList}" alt="${nextItem.title}">
        <source src="${nextMediaSource}"
        <video/>
        `;
    }
    let titleSelector = `.image-title--${nextPlaceInList}`;
    document.querySelector(".lightbox-image-title").innerText =
      document.querySelector(titleSelector).textContent;
      document.querySelector('.current-lightbox-image').focus();
  }
  openLightbox();
}

// once document is loaded do this
document.addEventListener("DOMContentLoaded", function (event) {
  
  chargeMainDiv();
  chargesLikesAndPriceDiv();
  addLikeCounterEvent();
  orderList();
  chargeModal();
  checkFields();
  chargeLightBox();
  console.log(memberMedias)
  
});
function recharge() {
  chargeMainDiv();
  addLikeCounterEvent();
  chargeModal();
  checkFields();
  openLightbox();
}

