import { getRequest, postRequest } from "./httpService";
import { Comment } from "../types/Caff";

class CommentService {
  async getComments(caffId: string) {
    const response = await getRequest("api/Comments/" + caffId);
    const data = (await response.json()) as Comment[];

    return data;
  }
  async addComment(comment: Comment) {
    const response = await postRequest("api/Comments", comment);
    const data = (await response.json()) as Comment;

    return data;
  }
  async deleteComment(id: number) {
    const response = await getRequest("api/Comments/" + id);
    const data = await response.json();

    return data;
  }
}

export const commentService = new CommentService();
