import './sass/main.scss'
import * as data from './data/photographers.json'
import Factory from './js/factory'

const factory = new Factory()
let members = []

// chargement des photographes
function chargeMembers () {
  members = []
  for (let i = 0; i < data.photographers.length; i++) {
    members.push(factory.createMember(data.photographers[i]))
  }
  let htmlMembers = ''
  for (const member of members) {
    let memberTagHtml = ''
    for (const tag of member.tags) {
      memberTagHtml += `
    <li class="tag-link tag-${tag}"><a href=""><span class="sr-only">${tag}</span>#${tag}</a></li>
    `
    }
    const template = `
        <div class="member" id="${member.id}">
          <a class="member-header">
            <div class="member-image">
                <img src="images/members-photos/${member.portrait}" alt="" class="member-logo" />
            </div>
            <h2 class="member-name">${member.name}</h2>
          </a>
          <div class="member-description">
            <h3 class="member-location">${member.city}, ${member.country}</h3>
            <h4 class="member-message">${member.tagline}</h4>
            <h5 class="member-price">${member.price}€/jour</h5>
          </div>
          <div class="member-tags">
            <ul class="member-tags-list">
            ${memberTagHtml}
            </ul>
          </div>
        </div>
`
    htmlMembers += template
  }
  document.getElementById('photographer-list').innerHTML = htmlMembers
}

document.addEventListener('DOMContentLoaded', function (event) {
  chargeMembers()
  addEventListenerToDifferentTagLink()
  document.querySelector('.header-link').addEventListener('click', (e) => {
    e.preventDefault()
    const membersElements = document.querySelectorAll('.member')
    for (const memberElement of membersElements) {
      memberElement.style.display = ''
    }
  })
})

function addEventListenerToDifferentTagLink () {
  const items = document.getElementsByClassName('tag-link')
  for (const item of items) {
    if (item.classList.contains('tag-portrait')) {
      item.addEventListener('click', (e) => orderMembers(e, 'portrait'))
    } else if (item.classList.contains('tag-fashion')) {
      item.addEventListener('click', (e) => orderMembers(e, 'fashion'))
    } else if (item.classList.contains('tag-art')) {
      item.addEventListener('click', (e) => orderMembers(e, 'art'))
    } else if (item.classList.contains('tag-architecture')) {
      item.addEventListener('click', (e) => orderMembers(e, 'architecture'))
    } else if (item.classList.contains('tag-travel')) {
      item.addEventListener('click', (e) => orderMembers(e, 'travel'))
    } else if (item.classList.contains('tag-sport')) {
      item.addEventListener('click', (e) => orderMembers(e, 'sport'))
    } else if (item.classList.contains('tag-animals')) {
      item.addEventListener('click', (e) => orderMembers(e, 'animals'))
    } else if (item.classList.contains('tag-events')) {
      item.addEventListener('click', (e) => orderMembers(e, 'events'))
    }
  }
}
function orderMembers (e, tag) {
  const membersElements = document.querySelectorAll('.member')
  e.preventDefault()
  switch (tag) {
    case 'portrait':
      for (const memberElement of membersElements) {
        if (memberElement.querySelector('.tag-portrait') === null) {
          memberElement.style.display = 'none'
        } else {
          memberElement.style.display = ''
        }
      }

      break
    case 'fashion':
      for (const memberElement of membersElements) {
        if (memberElement.querySelector('.tag-fashion') === null) {
          memberElement.style.display = 'none'
        } else {
          memberElement.style.display = ''
        }
      }

      break
    case 'art':
      for (const memberElement of membersElements) {
        if (memberElement.querySelector('.tag-art') === null) {
          memberElement.style.display = 'none'
        } else {
          memberElement.style.display = ''
        }
      }

      break
    case 'architecture':
      for (const memberElement of membersElements) {
        if (memberElement.querySelector('.tag-architecture') === null) {
          memberElement.style.display = 'none'
        } else {
          memberElement.style.display = ''
        }
      }

      break
    case 'travel':
      for (const memberElement of membersElements) {
        if (memberElement.querySelector('.tag-travel') === null) {
          memberElement.style.display = 'none'
        } else {
          memberElement.style.display = ''
        }
      }

      break
    case 'sport':
      for (const memberElement of membersElements) {
        if (memberElement.querySelector('.tag-sport') === null) {
          memberElement.style.display = 'none'
        } else {
          memberElement.style.display = ''
        }
      }

      break
    case 'animals':
      for (const memberElement of membersElements) {
        if (memberElement.querySelector('.tag-animals') === null) {
          memberElement.style.display = 'none'
        } else {
          memberElement.style.display = ''
        }
      }

      break
    case 'events':
      for (const memberElement of membersElements) {
        if (memberElement.querySelector('.tag-events') === null) {
          memberElement.style.display = 'none'
        } else {
          memberElement.style.display = ''
        }
      }

      break
    default:
      break
  }
}
