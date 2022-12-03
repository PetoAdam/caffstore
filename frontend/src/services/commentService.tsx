import { httpService } from "./httpService"
import { Comment } from "../types/Caff";

class CommentService {
    async getComments(caffId: string) {
        let url = 'api/Comments/' + caffId
        return await httpService.get(url)
    }
    async addComment(comment: Comment) {
        return await httpService.post("api/Comments", comment)
    }
    async deleteComment(id: number) {
        let url = "api/Comments/" + id
        return await httpService.delete(url)
    }
}

export const commentService = new CommentService()