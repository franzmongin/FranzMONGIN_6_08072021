export default class Member {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.tags = data.tags;
    this.portrait = data.portrait;
  }
  getTemplate() {
    let memberTagHtml = "";
    for (const tag of this.tags) {
      memberTagHtml += `
    <li class="tag-link tag-${tag}"><a href=""><span class="sr-only">${tag}</span>#${tag}</a></li>
    `;
    }
    return `
        <div class="member" id="${this.id}">
          <a class="member-header">
            <div class="member-image">
                <img src="images/members-photos/${this.portrait}" alt="" class="member-logo" />
            </div>
            <h2 class="member-name">${this.name}</h2>
          </a>
          <div class="member-description">
            <h3 class="member-location">${this.city}, ${this.country}</h3>
            <h4 class="member-message">${this.tagline}</h4>
            <h5 class="member-price">${this.price}€/jour</h5>
          </div>
          <div class="member-tags">
            <ul class="member-tags-list">
            ${memberTagHtml}
            </ul>
          </div>
        </div>
`;
  }
}
