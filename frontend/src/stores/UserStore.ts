import {
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { auth, db } from "../firebase";

export default class UserStore {
  isLoggedIn = false;

  isAdmin = false;

  user: User | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {
      name: "UserStore",
      properties: ["isLoggedIn", "isAdmin", "user"],
      storage: window.localStorage,
    });
  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log(error.message);
    });
    await this.setIsLoggedIn(true);
  }

  async logout() {
    await signOut(auth).catch((error) => {
      console.log(error.message);
    });
    await this.setIsLoggedIn(false);
  }

  async setIsLoggedIn(login: boolean) {
    this.isLoggedIn = login;
    this.setIsAdmin(false);
    this.user = undefined;
    if (login) {
      const user = auth.currentUser;
      if (user) this.user = user;
      const docRef = doc(db, "users", user!.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.data()?.isAdmin) this.setIsAdmin(true);
    }
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }
}
