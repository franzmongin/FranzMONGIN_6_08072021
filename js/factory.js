export default class Factory {
  createMember (data) {
    const member = new Member(data)
    return member
  }
}

class Member {
  constructor (data) {
    this.id = data.id
    this.name = data.name
    this.city = data.city
    this.country = data.country
    this.tagline = data.tagline
    this.price = data.price
    this.tags = data.tags
    this.portrait = data.portrait
  }
}
