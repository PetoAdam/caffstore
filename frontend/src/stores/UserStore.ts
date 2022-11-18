import { UserCredential } from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { auth } from "../firebase";

export default class UserStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  isLoggedIn = false;

  isAdmin = false;

  user: Partial<UserCredential> | undefined = undefined;

  setIsLoggedIn(login: boolean) {
    this.isLoggedIn = login;
    if (login) this.setUser(auth.currentUser || undefined);
    else this.setUser(undefined);
    if (!login) this.setIsAdmin(false);
  }

  setUser(user: Partial<UserCredential> | undefined) {
    this.user = user;
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
    this.isLoggedIn = isAdmin;
    this.setUser(auth.currentUser || undefined);
  }
}
