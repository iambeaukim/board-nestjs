import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { IReadArticleRepository } from '../../../domain/repository/read/read-article.repository';
import { Article } from '../../../domain/entity/article.model';
import { ArticleResponseDto } from '../../../interface/dto/article.response.dto';

@Injectable()
export class ReadArticleMongoRepository implements IReadArticleRepository {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: ReturnModelType<typeof Article>,
  ) {}

  async getArticles(): Promise<ArticleResponseDto[] | null> {
    return this.articleModel.find();
  }
}
