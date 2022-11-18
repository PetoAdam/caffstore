import { makeAutoObservable } from "mobx";

export default class CaffStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
