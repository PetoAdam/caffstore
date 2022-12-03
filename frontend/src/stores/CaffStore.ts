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
    // TODO - get caffs - check with backend
    this.caffs = await caffService.getCaffs()
    
    //this.caffs = [];
    //this.caffs.push(caffMock);
    //this.caffs.push(caffMock2);
  }

  getCaffById(id: number) {
    return this.caffs.find((x) => x.id === id);
  }

}
