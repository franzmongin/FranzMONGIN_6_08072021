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
    this.medias;
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
          <a href="./member.html?id=${this.id}" class="member-header">
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
  getMemberTemplate() {
    console.log(this);
    let memberTagHtml = "";
    for (const tag of this.tags) {
      memberTagHtml += `
    <li class="tag-link tag-${tag}">
      <a href=""><span class="sr-only">${tag}</span>#${tag}</a>
    </li>
    `;
    }
    let photosHtml = "";
    for (const media of this.medias) {
      console.log(media);
      if (media.video) {
        photosHtml += `
        <div class="list-item">
              <div class="list-item-content">
                <div class="item-image">
                  <video controls class="item-image-tag">
  <source src="./images/${this.name.split(" ").join("")}/${
          media.video
        }" type="video/mp4">
  Your browser does not support the video tag.
</video>
                </div>
                <h6>${media.title}</h6>
                <div class="like-div">
                  <span class="like-counter">12</span><img src="./images/icons/heart.svg" alt="" />
                </div>
              </div>
            </div>
      `;
      } else {
        photosHtml += `
        <div class="list-item">
              <div class="list-item-content">
                <div class="item-image">
                  <img
                    class="item-image-tag"
                    src="./images/${this.name.split(" ").join("")}/${
          media.image
        }"
                    alt=""
                  />
                  
                </div>
                <h6>${media.title}</h6>
                <div class="like-div">
                  <span class="like-counter">12</span><img src="./images/icons/heart.svg" alt="" />
                </div>
              </div>
            </div>
      `;
      }
    }
    return `
    <section class="member-presentation">
          <div class="member-description">
            <h1>${this.name}</h1>
            <button class="contact-me">Contactez-moi</button>
            <h3 class="member-location">${this.city}, ${this.country}</h3>
            <h4 class="member-message">Voir le beau dans le quotidien</h4>
            <div class="member-tags">
              <ul class="member-tags-list">
                ${memberTagHtml}
              </ul>
            </div>
          </div>
          <div class="member-avatar">
            <div class="member-image">
              <img
                src="images/members-photos/${this.portrait}"
                alt=""
                class="member-logo"
              />
            </div>
          </div>
        </section>
        <section class="photo-list-section">
          <div class="list-ordering">
            <span>Trier par</span
            ><select name="ordering-photo" id="ordering-photo">
              <option value="popularity">Popularité</option>
              <option value="date">Date</option>
              <option value="title">Titre</option>
            </select>
          </div>
          <div class="list">
            ${photosHtml}
          </div>
        </section>
    `;
  }
}
