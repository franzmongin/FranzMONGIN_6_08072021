export default class Media {
  constructor(data) {
    this.id = data.id;
    this.date = data.date;
    this.image = data.image;
    this.video = data.video;
    this.likes = data.likes;
    this.photographerId = data.photographerId;
    this.price = data.price;
    this.tags = data.tags;
    this.title = data.title;
  }
  getMediaTemplate(photoPlaceInList, memberName) {
    if (this.video) {
      this.likes += this.likes;
      return `
        <div class="list-item list-item-${
          this.id
        } list-item--${photoPlaceInList}">
              <div class="list-item-content">
                <div class="item-image">
                  <video class="item-image-tag" data-placeInList="${photoPlaceInList}">
  <source src="./images/${memberName.split(" ").join("")}/${
        this.video
      }" type="video/mp4">
  Your browser does not support the video tag.
</video>
                </div>
                <h6 class="image-title--${photoPlaceInList}">${this.title}</h6>
                <div class="like-div">
                  <span class="like-counter like-counter-${this.id}">${
        this.likes
      }</span><img src="./images/icons/heart.svg" alt="" class="like-photo-button like-photo-button-${
        this.id
      }" />
                </div>
              </div>
            </div>
      `;

      // pour les images simples
    } else {
      this.likes += this.likes;
      return `
        <div class="list-item list-item-${
          this.id
        } list-item--${photoPlaceInList}">
              <div class="list-item-content">
                <div class="item-image">
                  <img
                    class="item-image-tag" data-placeInList="${photoPlaceInList}"
                    src="./images/${memberName.split(" ").join("")}/${
        this.image
      }"
                    alt=""
                  />
                  
                </div>
                <h6 class="image-title--${photoPlaceInList}">${this.title}</h6>
                <div class="like-div">
                  <span class="like-counter like-counter-${this.id}">${
        this.likes
      }</span><img src="./images/icons/heart.svg" alt="" class="like-photo-button like-photo-button-${
        this.id
      }" />
                </div>
              </div>
            </div>
      `;
    }
  }
}
