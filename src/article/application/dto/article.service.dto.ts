import { ArticleType } from '../../domain/enum/article.type';
import { Article } from '../../domain/entity/article.model';
import { ObjectId } from 'mongoose';

export class ArticleServiceDto {
  id: ObjectId;

  title: string;

  content: string;

  type: ArticleType;

  createdAt: Date;

  updatedAt: Date;

  isActive: boolean;

  public toEntity(): Article {
    const article = new Article();
    article.title = this.title;
    article.content = this.content;
    article.type = this.type;
    return article;
  }

  public static fromEntity(article: Article): ArticleServiceDto {
    const articleServiceDto = new ArticleServiceDto();
    articleServiceDto.id = article._id;
    articleServiceDto.title = article.title;
    articleServiceDto.content = article.content;
    articleServiceDto.type = article.type;
    articleServiceDto.createdAt = article.createdAt;
    articleServiceDto.updatedAt = article.updatedAt;
    articleServiceDto.isActive = article.isActive;
    return articleServiceDto;
  }
}
