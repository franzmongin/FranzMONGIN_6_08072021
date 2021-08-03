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
    this.likes = 0;
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
            <div class="member-image" aria-label="${this.name}">
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
  getMemberTemplate(htmlMedias) {
    let memberTagHtml = "";
    for (const tag of this.tags) {
      memberTagHtml += `
    <li class="tag-link tag-${tag.name}">
      <a href="../index.html?tag=${tag}"><span class="sr-only">${tag}</span>#${tag}</a>
    </li>
    `;
    }

    return `
    <section class="member-presentation">
          <div class="member-description">
            <h1>${this.name}</h1>
            <button role="button" class="contact-me modal-btn" aria-label="Contact Me">Contactez-moi</button>
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
            <span id="ordering-label">Trier par</span
            >
            <div class= "order-collapse" id="">
              <button role="button" aria-haspopup="listbox" aria-expanded class="order-element order-element--active">Popularité<img class="arrow" src="../images/icons/chevron-down-solid.svg"/></button>
              <div class= "order-oppened" role="listbox" aria-activedescendant aria-selected aria-labelledby="ordering-label">
                <button role="button" class="order-element order-element--active" id="order-popularity">Popularité<img class="arrow" src="../images/icons/chevron-up-solid.svg"/></button>
                <button role="button" class="order-element order-element--inactive" id="order-date" tabIndex='0'>Date</button>
                <button role="button" class="order-element order-element--inactive" id="order-title">Titre</button>
              </div>
            </div>
            
          </div>
          <div class="list">
            ${htmlMedias}
          </div>
        </section>
    `;
  }
  getModalTemplate() {
    return `
        <div class="content" role="dialog" aria-label="Contact me ${this.name}" aria-labelledby="modal-heading">
          
          <div class="modal-body" id="modal-body">
          <div class="modal-header">
          <h1 id="modal-heading">Contactez-moi</br>${this.name}</h1>
          <span class="close"></span>
          </div>
            <div id="form-confirmation">
              <p id="form-confirmation-message">
                Merci ! Votre message a été envoyé !
              </p>
              <button
                class="btn-submit button"
                id="confirmation-close"
                value="Close"
                aria-label="Close Contact form"
              >
                Fermer
              </button>
            </div>
            <form
              name="reserve"
              action="index.html"
              method="get"
              id="modal-form"
            >
              <div class="formData">
                <label for="first-name" id="first-name-label">Prénom</label><br />
                <input
                  class="text-control"
                  type="text"
                  id="first-name"
                  name="first-name"
                  aria-labelledby="first-name-label"
                /><br />
                <p id="first-name-validation" class="form-validation"></p>
              </div>
              <div class="formData">
                <label for="last-name" id="last-name-label">Nom</label><br />
                <input
                  class="text-control"
                  type="text"
                  id="last-name"
                  name="last-name"
                  aria-labelledby="first-name-label"
                /><br />
                <p id="last-name-validation" class="form-validation"></p>
              </div>
              <div class="formData">
                <label for="email" id="email-label">E-mail</label><br />
                <input class="text-control" id="email" name="email aria-labelledby="first-name-label"" /><br />
                <p id="email-validation" class="form-validation"></p>
              </div>
              <div class="formData">
                <label for="message id="message-label"">Votre message</label><br />
                <textarea class="text-control" form="modal-form" id="message" name="message" aria-labelledby="first-name-label" /></textarea><br />
                <p id="message-validation" class="form-validation"></p>
              </div>

              <input
                class="btn-submit button"
                type="submit"
                value="Envoyer"
                aria-label="send"
              />
            </form>
          </div>
      </div>
    `;
  }
}
