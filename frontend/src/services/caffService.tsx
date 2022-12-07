import { Caff } from "../types/Caff";
import { auth } from "../firebase";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "./httpService";

class CaffService {
  async getCaffs() {
    const response = await getRequest("api/caffs").catch((error) => {
      console.log(error);
      return;
    });
    const data = (await response!.json()) as Caff[];

    return data;
  }

  async getCaffById(id: number) {
    const response = await getRequest("api/caffs/" + id).catch((error) => {
      console.log(error);
      return;
    });
    const data = (await response!.json()) as Caff;

    return data;
  }

  async modifyCaff(id: number, caff: any) {
    const response = await putRequest("api/caffs/" + id, caff).catch(
      (error) => {
        console.log(error);
        return;
      }
    );

    return response;
  }

  async addCaff(caff: Caff) {
    const response = await postRequest("api/caffs", caff).catch((error) => {
      console.log(error);
      return;
    });

    return response;
  }

  async deleteCaff(id: number) {
    const response = await deleteRequest("api/caffs/" + id).catch((error) => {
      console.log(error);
      return;
    });

    return response;
  }

  async getDownloadCaff(caffId: number) {
    const response = await getRequest("api/caffs/download?id=" + caffId).catch(
      (error) => {
        console.log(error);
        return;
      }
    );
    const data = (await response!.json()) as { file: string };

    return data;
  }
}

export const caffService = new CaffService();
