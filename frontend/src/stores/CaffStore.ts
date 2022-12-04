import { makeAutoObservable } from "mobx";
import { makePersistable, PersistStoreMap } from "mobx-persist-store";
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
    this.caffs = [];

    //TODO caffok lekérése a backendről
    this.caffs.push(caffMock);
    this.caffs.push(caffMock2);
    // TODO - get caffs - check with backend
    // let result: any = await caffService.getCaffs();
    // this.caffs = [];
    // result.forEach((caff: Caff) => {
    //   let addCaff: Caff = {
    //     id: caff.id,
    //     name: caff.name,
    //     creationDate: caff.creationDate,
    //     file: caff.file,
    //     uploader: caff.uploader,
    //     uploaderId: caff.uploaderId,
    //     comments: caff.comments,
    //   };
    //   this.caffs.push(addCaff);
    //   console.log(caff);
    // });
    // console.log(this.caffs);
  }

  getCaffById(id: number) {
    return this.caffs.find((x) => x.id === id);
  }
}
