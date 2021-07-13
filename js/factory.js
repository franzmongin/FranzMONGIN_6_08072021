import Member from "./Member";
export default class Factory {
  createMember(data) {
    const member = new Member(data);
    return member;
  }
}
