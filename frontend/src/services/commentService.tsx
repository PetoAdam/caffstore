import { deleteRequest, getRequest, postRequest } from "./httpService";
import { Comment } from "../types/Caff";

class CommentService {
  async getComments(caffId: string) {
    const response = await getRequest("api/Comments/" + caffId).catch(
      (error) => {
        console.log(error);
        return;
      }
    );
    const data = (await response!.json()) as Comment[];

    return data;
  }

  async addComment(comment: any) {
    const response = await postRequest("api/comments", comment).catch(
      (error) => {
        console.log(error);
        return;
      }
    );
    return response;
  }

  async deleteComment(id: number) {
    const response = await deleteRequest("api/Comments/" + id).catch(
      (error) => {
        console.log(error);
        return;
      }
    );

    return response;
  }
}

export const commentService = new CommentService();
