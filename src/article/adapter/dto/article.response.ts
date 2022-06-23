import { Article } from "../../domain/model/article.model";

export class ArticleResponse {
    
    id: string;

    title: string;

    content: string;

    createdDate: Date;

    updatedDate: Date;

    isActive: boolean;

    public static fromEntity(entity: Article) {
        const response = new ArticleResponse();
        response.id = entity._id;
        response.title = entity.title;
        response.content = entity.content;
        response.createdDate = entity.createdAt;
        response.updatedDate = entity.updatedAt;
        response.isActive = entity.isActive;        
        return response;
    }

}