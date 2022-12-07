import { doc, getDoc } from "firebase/firestore";
import { makeAutoObservable } from "mobx";
import { makePersistable, PersistStoreMap } from "mobx-persist-store";
import { db } from "../firebase";
import { caffService } from "../services/caffService";
import { Caff } from "../types/Caff";
import { toJS } from "mobx";

export default class CaffStore {
  caffs: Caff[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    const persist = () => {
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
    persist();
  }

  async getUserName(caffIndex: number) {
    const docRef = doc(db, "users", this.caffs[caffIndex].uploaderId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data()?.username) return docSnap.data()?.username;
    }
  }

  dataToBlob = async (imageData: string) => {
    return await (await fetch(imageData)).blob();
  };

  deleteCaff(caff: Caff) {
    this.caffs = this.caffs.filter((c) => c.id !== caff.id);
  }

  editCaff(caff: Caff) {
    this.caffs.map((c, index) => {
      if (c.id === caff.id) this.caffs[index] = caff;
    });
  }

  async getCaffs() {
    const result = toJS(await caffService.getCaffs());

    if (result) {
      if (result !== this.caffs) {
        this.caffs = result;
        this.caffs.map(async (caff, index) => {
          const blob = await this.dataToBlob(caff.file);

          const url = URL.createObjectURL(blob);

          this.caffs[index].file = url;
          this.caffs[index].uploader = await this.getUserName(index);
        });
      }
    } else {
      this.caffs = [];
    }
  }

  getCaffById(id: number) {
    return this.caffs.find((x) => x.id === id);
  }
}
