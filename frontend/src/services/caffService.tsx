import { httpService } from "./httpService"
import { Caff } from "../types/Caff";

class CaffService {
    async getCaffs() {
        return await httpService.get('api/caffs')
    }
    async getCaffById(id: number) {
        let url = 'api/caffs/' + id
        return await httpService.get(url)
    }
    async modifyCaff(id: number, caff: Caff) {
        let url = 'api/caffs/' + id
        return await httpService.put(url, caff)
    }
    async addCaff(caff: Caff) {
        return await httpService.post("api/caffs", caff)
    }
    async deleteCaff(id: number) {
        let url = "api/caffs/" + id
        return await httpService.delete(url)
    }
}

export const caffService = new CaffService()