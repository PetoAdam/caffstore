import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { makeAutoObservable } from "mobx";
import { makePersistable, PersistStoreMap } from "mobx-persist-store";
import { auth, db } from "../firebase";
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
    this.cart = [];
    this.isLoggedIn = login;
    this.setIsAdmin(false);
    this.user = undefined;
    if (login) {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user!.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          if (docSnap.data()?.isAdmin) this.setIsAdmin(true);
          this.user = docSnap.data() as User;
        } else {
          const newUser = {
            email: user.email,
            username: user.email,
            isAdmin: false,
            uid: user.uid,
          } as User;

          this.user = newUser;
          setDoc(doc(db, "users", user!.uid), newUser);
        }
      }
    }
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }
}
