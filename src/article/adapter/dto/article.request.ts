import { IsNotEmpty, IsOptional } from 'class-validator';
import { Article } from 'src/article/domain/model/article.model';

export class ArticleRequest {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  content: string;

  public toEntity() {
    const article = new Article();
    article.title = this.title;
    article.content = this.content;
    return article;
  }
}
