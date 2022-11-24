import { makeAutoObservable } from "mobx";
import { makePersistable, PersistStoreMap } from "mobx-persist-store";
import { Caff, caffMock } from "../types/Caff";

export default class CaffStore {
  caffs: Caff[] = [
    caffMock,
    caffMock,
    caffMock,
    caffMock,
    caffMock,
    caffMock,
    caffMock,
    caffMock,
  ];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getCaffs() {
    fetch("http://petonet.ddns.net:5000/api/caffs", {
      method: "get",
      credentials: "same-origin",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
