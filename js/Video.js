export default class Video{
    constructor(data){
    this.id = data.id
    this.date = data.date
    this.video = data.video
    this.likes = data.likes
    this.photographerId = data.photographerId
    this.price = data.price
    this.tags = data.tags
    this.title = data.title
    }
    getMediaTemplate(photoPlaceInList, memberName){
        return `
        <div class="list-item list-item-${
          this.id
        } list-item--${photoPlaceInList}">
              <div class="list-item-content">
                <div class="item-image">
                  <video class="item-image-tag" data-placeInList="${photoPlaceInList}"  tabIndex='0'>
  <source src="./images/${memberName.split(' ').join('')}/${
        this.video
      }" type="video/mp4">
  Your browser does not support the video tag.
</video>
                </div>
                <h6 class="image-title--${photoPlaceInList}">${this.title}</h6>
                <div class="like-div">
                  <span class="like-counter like-counter-${this.id}">${
                    this.likes
                  }</span><button class="heart-button like-photo-button like-photo-button-${
                    this.id
                  }"><img tabIndex='0' src="./images/icons/heart.svg" alt="likes" class="" /></button>
                </div>
              </div>
            </div>
      `
    }
}