import '../sass/main.scss'
import * as data from '../data/photographers.json'
import Factory from './Factory'

const factory = new Factory()
const membersJson = data.photographers
const mediaJson = data.media
const medias = []

for (let i = 0; i < mediaJson.length; i++) {
  if(mediaJson[i].image){
    medias.push(factory.createImage(mediaJson[i]))
  }else if(mediaJson[i].video){
    medias.push(factory.createVideo(mediaJson[i]))
  }
  
}

const url_string = window.location.href
const url = new URL(url_string)
const memberId = url.searchParams.get('id')

const memberData = membersJson.find(
  (member) => member.id === parseInt(memberId)
)
const member = factory.createMember(memberData)
const memberMedias = medias.filter((media) => {
  return media.photographerId === parseInt(memberId)
})
// tri par défault par popularité (nb de likes)
memberMedias.sort((a, b) => (a.likes < b.likes ? 1 : -1))
const mediaCounter = memberMedias.length

// chargement des photographes
function chargeMainDiv () {
  
  const htmlMemberPage = member.getMemberTemplate()
  const modalHtmlMember = member.getModalTemplate()
  document.getElementById('main-div').innerHTML = htmlMemberPage
  document.getElementById('member-modal').innerHTML = modalHtmlMember;
  chargeMediaList();
}
function chargeMediaList(){
  let htmlMedias = ''
  let photoPlaceInList = 0
  for (const media of memberMedias) {
    photoPlaceInList += 1
    htmlMedias += media.getMediaTemplate(photoPlaceInList, member.name)
    member.likes += media.likes
  }
  document.querySelector('.media-list').innerHTML = htmlMedias
}
// form checking and errors
function checkFields () {
  const errorMessages = {
    'first-name':
      'Veuillez entrer 2 caractères ou plus pour le champ du prénom',
    'last-name': 'Veuillez entrer 2 caractères ou plus pour le champ du nom',
    email: 'Veuillez entrer une adresse email valide',
    message: 'Veuillez entrer un message valide'
  }

  const fieldRegexs = {
    'first-name': '\\w{2,}',
    'last-name': '\\w{2,}',
    email: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)$",
    message: '\\w{2,}'
  }

  const formValidationsResults = []
  let formValid = true

  function fieldValidation (fieldName) {
    const regex = new RegExp(fieldRegexs[fieldName])
    if (regex.test(document.getElementById(fieldName).value)) {
      document.getElementById(fieldName + '-validation').innerText = ''
      formValidationsResults[fieldName] = true
    } else {
      document.getElementById(fieldName + '-validation').innerText =
        errorMessages[fieldName]
      formValidationsResults[fieldName] = false
    }
  }

  // fonction appelée lors du submit du formulaire
  function onSubmit (e) {
    formValid = true
    e.preventDefault()
    console.log(document.getElementById('first-name').value, document.getElementById('last-name').value, document.getElementById('email').value, document.getElementById('message').value )
    fieldValidation('first-name')
    fieldValidation('last-name')
    fieldValidation('email')
    fieldValidation('message')
    for (const [, value] of Object.entries(formValidationsResults)) {
      if (value === false) {
        formValid = false
      }
    }
    if (formValid) {
      document.querySelector('#modal-form').style.display = 'none'
      document.querySelector('#form-confirmation').style.display = 'flex'
    }
  }

  document.getElementById('modal-form').addEventListener('submit', onSubmit)
}

// open and close modal
function chargeModal () {
  // DOM Elements
  const modalbg = document.querySelector('.bground')
  const modalBtn = document.querySelectorAll('.modal-btn')
  const modalClose = document.querySelectorAll('.content .close')


  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))

  // close modal event
  modalClose.forEach((btn) => btn.addEventListener('click', closeModal))
  document
    .getElementById('confirmation-close')
    .addEventListener('click', closeModal)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal()
      // close lightbox too if oppened
      document.querySelector('.lightbox-modal').style.display = 'none'
    }
  })

  // launch modal form
  function launchModal () {
    modalbg.style.display = 'flex'
    document.querySelector('#modal-form').style.display = 'inherit'
    document.querySelector('#form-confirmation').style.display = 'none'
    document.querySelector('#first-name').focus()
  }

  // close modal form
  function closeModal () {
    modalbg.style.display = 'none'
    document.querySelectorAll('.form-validation').forEach((element) => {
      element.innerText = ''
    })
  }
}

// fixed likesandprices
function chargesLikesAndPriceDiv () {
  const likesAndPriceHtml = `
    <div class="likes" id="likes"><span id="member-total-likes">${member.likes}</span><img src="./images/icons/heart_black.svg"/></div>
    <div class="price" id="price">${member.price}€/jour</div>
  `
  document.getElementById('likes-and-price').innerHTML = likesAndPriceHtml
}

// like photo event
function addLikeCounterEvent () {
  for (const item of document.getElementsByClassName('like-photo-button')) {
    const itemClasses = []
    for (const value of item.classList.values()) {
      itemClasses.push(value)
    }
    const itemId = itemClasses
      .filter((el) => el.includes('like-photo-button-'))[0]
      .split('like-photo-button-')[1]
    item.addEventListener('click', function () {
      document.getElementById('member-total-likes').innerText = parseInt(
        parseInt(document.getElementById('member-total-likes').textContent) + 1
      )
      document.querySelector('.like-counter-' + itemId).innerText =
        parseInt(
          document.querySelector('.like-counter-' + itemId).textContent
        ) + 1
    })
  }
}

function orderList () {
  function openOrderChoices () {
    document.querySelectorAll('.order-element--active').forEach((e) => {
      e.addEventListener('click', function () {
        if (document.querySelector('.order-oppened').style.display === 'flex') {
          document.querySelector('.order-oppened').style.display = 'none'
        } else {
          document.querySelector('.order-oppened').style.display = 'flex'
        }
      })
    })
  }
  function orderPhotos () {
    document.querySelectorAll('.order-element--inactive').forEach((el) => {
      el.addEventListener('click', () => {
        const id = el.id
        switch (id) {
          case 'order-date':
            memberMedias.sort((a, b) => {
              return new Date(b.date) - new Date(a.date)
            })

            recharge()
            changeOrderlistAfter('date')
            orderList()
            break
          case 'order-popularity':
            memberMedias.sort((a, b) => (a.likes < b.likes ? 1 : -1))
            recharge()
            changeOrderlistAfter('popularity')
            orderList()
            break
          case 'order-title':
            memberMedias.sort((a, b) => (a.title > b.title ? 1 : -1))
            recharge()
            changeOrderlistAfter('title')
            orderList()
            break
          default:
            break
        }
      })
    })
  }
  function changeOrderlistAfter (choice) {
    let templateOrderChoices = ''
    switch (choice) {
      case 'date':
        templateOrderChoices = `
            <span id="ordering-label">Trier par</span>
            <div class= "order-collapse" id="">
              <button class="order-element order-element--active">Date<img class="arrow" src="./images/icons/chevron-down-solid.svg"/></button>
              <div class= "order-oppened" role="listbox" aria-activedescendant aria-selected aria-labelledby="ordering-label">
                <button class="order-element order-element--active" id="order-date">Date<img class="arrow" src="./images/icons/chevron-up-solid.svg"/></button>
                <button class="order-element order-element--inactive" id="order-popularity">Popularité</button>
                <button class="order-element order-element--inactive" id="order-title">Titre</button>
              </div>
            </div>
        `
        break
      case 'title':
        templateOrderChoices = `
            <span class="ordering-label">Trier par</span>
            <div class= "order-collapse" id="">
              <button class="order-element order-element--active">Titre<img class="arrow" src="./images/icons/chevron-down-solid.svg"/></button>
              <div class= "order-oppened" role="listbox" aria-activedescendant aria-selected aria-labelledby="ordering-label">
                <button class="order-element order-element--active" id="order-title">Titre<img class="arrow" src="./images/icons/chevron-up-solid.svg"/></button>
                <button class="order-element order-element--inactive" id="order-popularity">Popularité</button>
                <button class="order-element order-element--inactive" id="order-date">Date</button>
              </div>
            </div>
        `
        break
      case 'popularity':
        templateOrderChoices = `
            <span class="ordering-title">Trier par</span>
            <div class= "order-collapse" id="">
              <button class="order-element order-element--active">Popularité<img class="arrow" src="./images/icons/chevron-down-solid.svg"/></button>
              <div class= "order-oppened" role="listbox" aria-activedescendant aria-selected aria-labelledby="ordering-label">
                <button class="order-element order-element--active" id="order-popularité">Popularité<img class="arrow" src="./images/icons/chevron-up-solid.svg"/></button>
                <button class="order-element order-element--inactive" id="order-title">Titre</button>
                <button class="order-element order-element--inactive" id="order-date">Date</button>
              </div>
            </div>
        `
        break
      default:
        break
    }
    document.querySelector('.list-ordering').innerHTML = templateOrderChoices
  }
  openOrderChoices()
  orderPhotos()
}
function openLightbox () {
  // open modal lightbox
  document.querySelectorAll('.item-image-tag').forEach((el) => {
    const elementType = el.tagName

    if (elementType === 'IMG') {
      const source = el.getAttribute('src')
      const photoPlaceInList = el.getAttribute('data-placeinlist')
      el.addEventListener('click', function () {
        const titleSelector = `.image-title--${photoPlaceInList}`
        const titleContent = document.querySelector(titleSelector).textContent
        document.querySelector('.lightbox-modal').style.display = 'flex'
        document.querySelector(
          '.lightbox-image-tag'
        ).innerHTML = ` <img  tabindex="0" src="${source}" class="current-lightbox-image" data-placeInList="${photoPlaceInList}" alt="${titleContent}">`

        document.querySelector('.lightbox-image-title').innerText =
          titleContent
        document.querySelector('.current-lightbox-image').focus()
      })
      el.addEventListener('keydown', function (e) {
        if (e.which === 13) {
          const titleSelector = `.image-title--${photoPlaceInList}`
          const titleContent = document.querySelector(titleSelector).textContent
          document.querySelector('.lightbox-modal').style.display = 'flex'
          document.querySelector(
            '.lightbox-image-tag'
          ).innerHTML = ` <img  tabindex="0" src="${source}" class="current-lightbox-image" data-placeInList="${photoPlaceInList}" alt="${titleContent}">`

          document.querySelector('.lightbox-image-title').innerText =
            titleContent
          document.querySelector('.current-lightbox-image').focus()
        }
      })
    } else {
      const source = el.querySelector('source').getAttribute('src')
      const photoPlaceInList = el.getAttribute('data-placeinlist')
      el.addEventListener('click', function () {
        const titleSelector = `.image-title--${photoPlaceInList}`
        const titleContent = document.querySelector(titleSelector).textContent
        document.querySelector('.lightbox-modal').style.display = 'flex'
        document.querySelector(
          '.lightbox-image-tag'
        ).innerHTML = ` <video  tabindex="0" controls class="current-lightbox-image" data-placeInList="${photoPlaceInList}">
        <source src="${source}"
        <video/>
        `

        document.querySelector('.lightbox-image-title').innerText =
          titleContent
        document.querySelector('.current-lightbox-image').focus()
      })
      el.addEventListener('keydown', function (e) {
        if (e.which === 13) {
          const titleSelector = `.image-title--${photoPlaceInList}`
          const titleContent = document.querySelector(titleSelector).textContent
          document.querySelector('.lightbox-modal').style.display = 'flex'
          document.querySelector(
            '.lightbox-image-tag'
          ).innerHTML = ` <video  tabindex="0" controls class="current-lightbox-image" data-placeInList="${photoPlaceInList}">
        <source src="${source}"
        <video/>
        `

          document.querySelector('.lightbox-image-title').innerText =
          titleContent
          document.querySelector('.current-lightbox-image').focus()
        }
      })
    }
  })
}
// LIGHTBOX
function chargeLightBox () {
  // close modal lightbox
  document.querySelector('.close-lightbox').addEventListener('click', () => {
    document.querySelector('.lightbox-modal').style.display = 'none'
  })

  // previous modal lightbox
  function previousLightboxHandler () {
    const photoPlaceInList = document
      .querySelector('.current-lightbox-image')
      .getAttribute('data-placeinlist')
    const previousPlaceInList =
    parseInt(photoPlaceInList) - 1 < 1
      ? mediaCounter
      : parseInt(photoPlaceInList) - 1
    const searchedAttribute = `[data-placeInList='${previousPlaceInList}']`
    const previousItem = memberMedias[previousPlaceInList - 1]
    const previousMediaElement = document.querySelector(searchedAttribute)
    // if previous media is an image
    if (previousMediaElement.tagName === 'IMG') {
      const previousMediaSource = document
        .querySelector(searchedAttribute)
        .getAttribute('src')
      document.querySelector(
        '.lightbox-image-tag'
      ).innerHTML = ` <img tabindex="0" src="${previousMediaSource}" class="current-lightbox-image" data-placeInList="${previousPlaceInList}" alt="${previousItem.title}">`
    } else {
    // if previous media is a video
      const previousMediaSource = document
        .querySelector(searchedAttribute)
        .querySelector('source')
        .getAttribute('src')
      document.querySelector(
        '.lightbox-image-tag'
      ).innerHTML = ` <video tabindex="0" class="current-lightbox-image" data-placeInList="${previousPlaceInList}" alt="${previousItem.title}">
      <source src="${previousMediaSource}"
      <video/>
      `
    }
    const titleSelector = `.image-title--${previousPlaceInList}`
    document.querySelector('.lightbox-image-title').innerText =
    document.querySelector(titleSelector).textContent
    document.querySelector('.current-lightbox-image').focus()
  }
  document.querySelector('.previous-lightbox').addEventListener('click', previousLightboxHandler)
  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.lightbox-modal').style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
        previousLightboxHandler()
      }
    }
  })

  // previous modal lightbox keyboard

  // next modal lightbox
  document
    .querySelector('.next-lightbox')
    .addEventListener('click', nextLightBoxHandler)
  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.lightbox-modal').style.display === 'flex') {
      if (e.key === 'ArrowRight') {
        nextLightBoxHandler()
      }
    }
  })
  function nextLightBoxHandler () {
    const photoPlaceInList = document
      .querySelector('.current-lightbox-image')
      .getAttribute('data-placeinlist')
    const nextPlaceInList =
      parseInt(photoPlaceInList) + 1 > mediaCounter
        ? 1
        : parseInt(photoPlaceInList) + 1
    const nextItem = memberMedias[nextPlaceInList - 1]
    const searchedAttribute = `[data-placeInList='${nextPlaceInList}']`
    const nextMediaElement = document.querySelector(searchedAttribute)
    // if next media is an image
    if (nextMediaElement.tagName === 'IMG') {
      const nextMediaSource = document
        .querySelector(searchedAttribute)
        .getAttribute('src')
      document.querySelector(
        '.lightbox-image-tag'
      ).innerHTML = ` <img tabindex="0" src="${nextMediaSource}" class="current-lightbox-image" data-placeInList="${nextPlaceInList}" alt="${nextItem.title}">`
    } else {
      // if next media is a video
      const nextMediaSource = document
        .querySelector(searchedAttribute)
        .querySelector('source')
        .getAttribute('src')
      document.querySelector(
        '.lightbox-image-tag'
      ).innerHTML = ` <video tabindex="0" class="current-lightbox-image" data-placeInList="${nextPlaceInList}" alt="${nextItem.title}">
        <source src="${nextMediaSource}"
        <video/>
        `
    }
    const titleSelector = `.image-title--${nextPlaceInList}`
    document.querySelector('.lightbox-image-title').innerText =
      document.querySelector(titleSelector).textContent
    document.querySelector('.current-lightbox-image').focus()
  }
  openLightbox()
}

// once document is loaded do this
document.addEventListener('DOMContentLoaded', function () {
  chargeMainDiv()
  chargesLikesAndPriceDiv()
  addLikeCounterEvent()
  orderList()
  chargeModal()
  checkFields()
  chargeLightBox()
})
function recharge () {
  chargeMediaList()
  addLikeCounterEvent()
  openLightbox()
}
