import {IsEnum, IsNotEmpty, IsOptional} from 'class-validator';
import {Article} from '../../domain/model/article.model';
import {ArticleType} from "../../common/article.type";

export class ArticleRequest {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  content: string;

  @IsEnum(ArticleType)
  @IsNotEmpty()
  type: ArticleType;

  public toEntity() {
    const article = new Article();
    article.title = this.title;
    article.content = this.content;
    article.type = this.type;
    return article;
  }
}
