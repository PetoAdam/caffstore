import { makeAutoObservable } from "mobx";
import { makePersistable, PersistStoreMap } from "mobx-persist-store";
import { caffService } from "../services/caffService";
import { Caff, caffMock, caffMock2 } from "../types/Caff";

export default class CaffStore {
  caffs: Caff[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: "CaffStore",
      properties: ["caffs"],
      storage: window.localStorage,
    });
  }

  async getCaffs() {
    const result = (await caffService.getCaffs()) as Caff[];
    this.caffs = result;
    console.log(this.caffs);
  }

  getCaffById(id: number) {
    return this.caffs.find((x) => x.id === id);
  }
}
