import './sass/main.scss'
import * as data from './data/photographers.json'
import Factory from './js/factory'

const membersdata = data.photographers
console.log(membersdata)
const factory = new Factory()
const members = []

for (let i = 0; i < membersdata.length; i++) {
  members.push(factory.createMember(membersdata[i]))
}
let htmlMembers = ''
for (const member of members) {
  console.log(member)
  let memberTagHtml = ''
  for (const tag of member.tags) {
    memberTagHtml += `
    <li class="tag-link"><a href=""><span class="sr-only">${tag}</span>#${tag}</a></li>
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
