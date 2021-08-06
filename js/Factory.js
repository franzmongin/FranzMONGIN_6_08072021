import Member from './Member'
import Image from './Image'
import Video from './Video'
export default class Factory {
  createMember (data) {
    const member = new Member(data)
    return member
  }

  createImage(data){
    const image = new Image(data)
    return image
  }
  createVideo(data){
    const video = new Video(data)
    return video
  }
}
