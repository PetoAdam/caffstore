import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { caffService } from "../services/caffService";
import { Caff } from "../types/Caff";

export default class CaffStore {
  caffs: Caff[] = [];
  static resetCaff: any;

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
    let result: any = await caffService.getCaffs();
    this.caffs = [];
    result.forEach((caff: Caff) => {
      let addCaff: Caff = {
        id: caff.id,
        name: caff.name,
        creationDate: caff.creationDate,
        file: caff.file,
        uploader: caff.uploader,
        uploaderId: caff.uploaderId,
        comments: caff.comments,
      };
      this.caffs.push(addCaff);
      console.log(caff);
    });
    console.log(this.caffs);
    //this.caffs = [];
    //this.caffs.push(caffMock);
    //this.caffs.push(caffMock2);
  }

  getCaffById(id: number) {
    return this.caffs.find((x) => x.id === id);
  }

  resetCaffs() {
    this.caffs = [];
  }
}
