import { makeAutoObservable } from "mobx";
import { makePersistable, PersistStoreMap } from "mobx-persist-store";
import { Caff, caffMock, caffMock2 } from "../types/Caff";

export default class CaffStore {
  caffs: Caff[] = [caffMock, caffMock2];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getCaffs() {
    //TODO api hívás
  }

  getCaffById(id: number) {
    return this.caffs.find((x) => x.id === id);
  }
}
