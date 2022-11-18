import CaffStore from "./CaffStore";
import UserStore from "./UserStore";

export default class RootStore {
  userStore: UserStore;
  caffStore: CaffStore;

  constructor() {
    this.userStore = new UserStore();
    this.caffStore = new CaffStore();
  }
}
