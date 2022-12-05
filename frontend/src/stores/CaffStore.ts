import { doc, getDoc } from "firebase/firestore";
import { makeAutoObservable } from "mobx";
import { makePersistable, PersistStoreMap } from "mobx-persist-store";
import { db } from "../firebase";
import { caffService } from "../services/caffService";
import { Caff, caffMock, caffMock2 } from "../types/Caff";

export default class CaffStore {
  caffs: Caff[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    /*const persist = () => {
      makePersistable(this, {
        name: "caffStore",
        properties: ["caffs"],
        storage: window.localStorage,
      });
    };

    const persistedStore = Array.from(PersistStoreMap.values()).find((el) =>
      el.storageName.includes("caffStore")
    );
    if (persistedStore) {
      persistedStore.stopPersisting();
    }
    persist();*/
  }

  async getUserName(caffIndex: number) {
    const docRef = doc(db, "users", this.caffs[caffIndex].uploaderId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data()?.username)
        this.caffs[caffIndex].uploader = docSnap.data()?.username;
    }
  }

  async getCaffs() {
    const result = (await caffService.getCaffs()) as Caff[];

    this.caffs = result;
    this.caffs.map(async (caff, index) => {
      console.log(index, caff.name);

      await this.getUserName(index);
      //this.caffs.push(caff);
    });

    console.log(this.caffs);
  }

  getCaffById(id: number) {
    return this.caffs.find((x) => x.id === id);
  }
}
