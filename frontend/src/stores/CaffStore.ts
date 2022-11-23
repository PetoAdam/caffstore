import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export default class CaffStore {
  caffs = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {
      name: "CaffStore",
      properties: ["caffs"],
      storage: window.localStorage,
    });
  }

  getCaffs() {}
}
