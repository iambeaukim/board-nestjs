import { ArticleType } from '../../domain/enum/article.type';
import { ArticleServiceDto } from '../../application/dto/article.service.dto';
import { ObjectId } from 'mongoose';

export class ArticleResponseDto {
  id: ObjectId;

  title: string;

  content: string;

  type: ArticleType;

  createdDate: Date;

  updatedDate: Date;

  isActive: boolean;

  public static fromServiceDto(articleServiceDto: ArticleServiceDto) {
    const response = new ArticleResponseDto();
    response.id = articleServiceDto.id;
    response.title = articleServiceDto.title;
    response.content = articleServiceDto.content;
    response.type = articleServiceDto.type;
    response.createdDate = articleServiceDto.createdAt;
    response.updatedDate = articleServiceDto.updatedAt;
    response.isActive = articleServiceDto.isActive;
    return response;
  }
}
