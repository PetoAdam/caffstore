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
    const response = await getRequest("api/caffs");
    const data = (await response.json()) as Caff[];

    return data;
  }
  async getCaffById(id: number) {
    const response = await getRequest("api/caffs" + id);
    const data = (await response.json()) as Caff;

    return data;
  }
  async modifyCaff(id: number, caff: Caff) {
    const response = await putRequest("api/caffs/" + id, caff);
    const data = await response.json();

    return data;
  }
  async addCaff(caff: Caff) {
    const response = await postRequest("api/caffs", caff);
    const data = await response.json();

    return data;
  }
  async deleteCaff(id: number) {
    const response = await deleteRequest("api/caffs/" + id);
    const data = await response.json();

    return data;
  }
}

export const caffService = new CaffService();
