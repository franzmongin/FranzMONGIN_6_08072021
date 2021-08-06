import Member from './Member'
import Media from './Media'
export default class Factory {
  createMember (data) {
    const member = new Member(data)
    return member
  }

  createMedia (data) {
    const media = new Media(data)
    return media
  }
}
