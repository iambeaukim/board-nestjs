import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Article } from '../../domain/entity/article.model';
import { IArticleRepository } from 'src/article/domain/repository/article.repository';

type Nullable<T> = T | null;
//type Optional<T> = T | null | undefined;

@Injectable()
export class ArticleMongoRepository implements IArticleRepository {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: ReturnModelType<typeof Article>,
  ) {}

  async save(article: Article): Promise<Article> {
    const articleModel = new this.articleModel(article);
    return await articleModel.save();
  }

  async findAll(): Promise<Nullable<Article[]>> {
    return await this.articleModel.find().exec();
  }
}
