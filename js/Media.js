export default class Media {
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
  }
  