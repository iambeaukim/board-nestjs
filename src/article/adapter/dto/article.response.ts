import { Article } from '../../domain/model/article.model';
import {ArticleType} from "../../common/article.type";

export class ArticleResponse {
  id: string;

  title: string;

  content: string;

  type: ArticleType;

  createdDate: Date;

  updatedDate: Date;

  isActive: boolean;

  public static fromEntity(entity: Article) {
    const response = new ArticleResponse();
    response.id = entity._id;
    response.title = entity.title;
    response.content = entity.content;
    response.type = entity.type;
    response.createdDate = entity.createdAt;
    response.updatedDate = entity.updatedAt;
    response.isActive = entity.isActive;
    return response;
  }
}
