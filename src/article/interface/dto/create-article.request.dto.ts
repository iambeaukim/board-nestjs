import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ArticleType } from '../../domain/enum/article.type';
import { ArticleServiceDto } from '../../application/dto/article.service.dto';

export class CreateArticleRequestDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  content: string;

  @IsEnum(ArticleType)
  @IsNotEmpty()
  type: ArticleType;

  public toServiceDto(): ArticleServiceDto {
    const article = new ArticleServiceDto();
    article.title = this.title;
    article.content = this.content;
    article.type = this.type;
    return article;
  }
}
