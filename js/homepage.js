import '../sass/main.scss'
import * as data from '../data/photographers.json'
import Factory from './Factory'

const factory = new Factory()
let membersJson = data.photographers
let members = []

// chargement des photographes
function chargeMembers () {
  members = []

  for (let i = 0; i < membersJson.length; i++) {
    members.push(factory.createMember(membersJson[i]))
  }
  let htmlMembers = ''
  for (const member of members) {
    htmlMembers += member.getTemplate()
  }
  document.getElementById('photographer-list').innerHTML = htmlMembers
}

function addEventListenerToDifferentTagLink () {
  const items = document.getElementsByClassName('tag-link')
  function fireTagInUse(tag){
    document.querySelectorAll('.tag-link').forEach(element => {
      element.classList.remove('tag-in-use')
    });
    document.querySelectorAll(`.tag-${tag}`).forEach(element => {
      element.classList.add('tag-in-use')
    });
  }
  for (const item of items) {
    if (item.classList.contains('tag-portrait')) {
      item.addEventListener('click', (e) =>{
        
        orderMembers(e, 'portrait')
        fireTagInUse('portrait');
        
      })
    } else if (item.classList.contains('tag-fashion')) {
      item.addEventListener('click', (e) =>{
        orderMembers(e, 'fashion')
        fireTagInUse('fashion')
      })
    } else if (item.classList.contains('tag-art')) {
      item.addEventListener('click', (e) =>{
        orderMembers(e, 'art')
        fireTagInUse('art')
      })
    } else if (item.classList.contains('tag-architecture')) {
      item.addEventListener('click', (e) =>{
        orderMembers(e, 'architecture')
        fireTagInUse('architecture')
      })
    } else if (item.classList.contains('tag-travel')) {
      item.addEventListener('click', (e) =>{
        orderMembers(e, 'travel')
        fireTagInUse('travel')
      })
    } else if (item.classList.contains('tag-sports')) {
      item.addEventListener('click', (e) =>{
        orderMembers(e, 'sports')
        fireTagInUse('sports')
      })
    } else if (item.classList.contains('tag-animals')) {
      item.addEventListener('click', (e) =>{
        orderMembers(e, 'animals')
        fireTagInUse('animals')
      })
    } else if (item.classList.contains('tag-events')) {
      item.addEventListener('click', (e) =>{
        orderMembers(e, 'events')
        fireTagInUse('events')
      })
    }
  }
}
function orderMembers (e, tag) {
  e.stopPropagation()
  e.preventDefault()
  switch (tag) {
    case 'portrait':
      membersJson = data.photographers.filter(function (item) {
        return item.tags.includes('portrait')
      })

      break
    case 'fashion':
      membersJson = data.photographers.filter(function (item) {
        return item.tags.includes('fashion')
      })

      break
    case 'art':
      membersJson = data.photographers.filter(function (item) {
        return item.tags.includes('art')
      })

      break
    case 'architecture':
      membersJson = data.photographers.filter(function (item) {
        return item.tags.includes('architecture')
      })

      break
    case 'travel':
      membersJson = data.photographers.filter(function (item) {
        return item.tags.includes('travel')
      })

      break
    case 'sports':
      membersJson = data.photographers.filter(function (item) {
        return item.tags.includes('sports')
      })

      break
    case 'animals':
      membersJson = data.photographers.filter(function (item) {
        return item.tags.includes('animals')
      })

      break
    case 'events':
      membersJson = data.photographers.filter(function (item) {
        return item.tags.includes('events')
      })

      break
    default:
      break
  }
  chargeMembers()
  addEventListenerToDifferentTagLink()
}
const mainY = document.querySelector('.main').offsetTop

// gestion du bouton apparaissant quand le scroll dépasse la balise main
document.addEventListener('DOMContentLoaded', function () {
  chargeMembers()
  addEventListenerToDifferentTagLink()
  window.addEventListener('scroll', function () {
    if (window.scrollY > mainY) {
      document.querySelector('.back-to-main-div').style.display = 'flex'
    } else {
      document.querySelector('.back-to-main-div').style.display = 'none'
    }
  })

  const url_string = window.location.href
  const url = new URL(url_string)
  const routeTag = url.searchParams.get('tag')
  if (routeTag) {
    const tagName = '.tag-' + routeTag
    document.querySelector(tagName).click();
    document.querySelector(tagName).classList.add('tag-in-use');

  }
})
