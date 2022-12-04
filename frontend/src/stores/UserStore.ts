import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { makeAutoObservable } from "mobx";
import { makePersistable, PersistStoreMap } from "mobx-persist-store";
import { useStore } from ".";
import { auth } from "../firebase";
import { authService } from "../services/authService";
import { httpService } from "../services/httpService";
import { Caff } from "../types/Caff";
import { User } from "../types/User";
import CaffStore from "./CaffStore";

export default class UserStore {
  isLoggedIn = false;

  user: User = {
    email: "",
    isAdmin: false,
    userId: 0,
    username: ""
  };

  cart: Caff[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    const persist = () => {
      makePersistable(this, {
        name: "userStore",
        properties: ["isLoggedIn", "user", "cart"],
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
      let userData = { email: email, password: password }
      let result: any = await authService.login(userData)
      this.user.email = result.user.email
      this.user.isAdmin = result.user.admin
      this.user.userId = result.user.id
      this.user.username = result.user.name
      let tokenData = { token: result.token, returnSecureToken: true }
      let resGoogle = await authService.googleLogin(tokenData)
      httpService.accessToken = resGoogle.idToken
      this.isLoggedIn = true
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  async signUp(email: string, password: string){
    try {
      let userData = { email: email, password: password }
      let result: any = await authService.signUp(userData)
      // createUserWithEmailAndPassword(auth, email, password)
      //   .then((userCredential: any) => {
      //     const user = userCredential.user;
      //     httpService.accessToken = userCredential.user.accessToken
      //     setDoc(doc(db, "users", user.uid), {
      //       email: user.email,
      //       username: user.email,
      //       isAdmin: false,
      //       uid: user.uid,
      //     }).then(() => {
      //       navigate("/");
      //     });
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     console.log(errorMessage);
      //   });
    } catch (error) {
      
    }
  }

  async logout() {
    try {
      const { caffStore } = useStore();
      await signOut(auth)
      httpService.accessToken = ""
      this.isLoggedIn = false
      this.user.email = ""
      this.user.isAdmin = false
      this.user.userId = 0
      this.user.username = ""
      this.resetCart();
      caffStore.resetCaff()
    } catch (error) {
      console.log(error)
    }
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
