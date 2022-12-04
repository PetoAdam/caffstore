import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { makeAutoObservable } from "mobx";
import { makePersistable, PersistStoreMap } from "mobx-persist-store";
import { auth } from "../firebase";
import { authService } from "../services/authService";
import { httpService } from "../services/httpService";
import { Caff } from "../types/Caff";
import { User } from "../types/User";

export default class UserStore {
  isLoggedIn = false;

  isAdmin = false;

  user: User | undefined = undefined;

  cart: Caff[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    const persist = () => {
      makePersistable(this, {
        name: "userStore",
        properties: ["isLoggedIn", "isAdmin", "user", "cart"],
        storage: window.localStorage,
      });
    };

    const persistedStore = Array.from(PersistStoreMap.values()).find((el) =>
      el.storageName.includes("userStore")
    );
    if (persistedStore) {
      persistedStore.stopPersisting();
    }
    persist();
  }

  async login(email: string, password: string) {
    try {
      let userData = { email: email, password: password}
      let result: any = await authService.login(userData)
      this.isAdmin = result.isAdmin
      let tokenData = { token: result.token, returnSecureToken: true}
      result = await authService.googleLogin(tokenData)
      httpService.accessToken = result.idToken 
      this.isLoggedIn = true
      console.log(result)
    } catch (error) {
      console.log(error)
    }
    //await this.setIsLoggedIn(true);
  }

  async logout() {
    await signOut(auth).catch((error) => {
      console.log(error.message);
    });
    httpService.accessToken = ""
    //await this.setIsLoggedIn(false);
    this.resetCart();
  }

  // async setIsLoggedIn(login: boolean) {
  //   this.isLoggedIn = login;
  //   this.setIsAdmin(false);
  //   this.setUser(undefined);
  //   if (login) {
  //     const user = auth.currentUser;
  //     if (user) {
  //       const docRef = doc(db, "users", user!.uid);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         if (docSnap.data()?.isAdmin) this.setIsAdmin(true);
  //         this.setUser(docSnap.data() as User);
  //       } else {
  //         const newUser = {
  //           email: user.email,
  //           username: user.email,
  //           isAdmin: false,
  //           uid: user.uid,
  //         } as User;

  //         this.setUser(newUser);
  //         setDoc(doc(db, "users", user!.uid), newUser);
  //       }
  //     }
  //   }
  // }

  setUser(user: User | undefined) {
    this.user = user;
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }

  addToCart(caff: Caff) {
    if (!this.cart.find((x) => x.id === caff.id)) {
      this.cart.push(caff);
      return true;
    } else return false;
  }

  resetCart() {
    this.cart = [];
  }

  removeFromCart(caff: Caff) {
    this.cart = this.cart.filter((c) => c.id !== caff.id);
  }
}
