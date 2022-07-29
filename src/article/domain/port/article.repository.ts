import { Article } from '../model/article.model';
import { ReturnModelType } from '@typegoose/typegoose';

export interface ArticleRepository {
  save(article: Article): Promise<Article>;
  findAll(): Promise<Article[] | null>;
  getModel(): ReturnModelType<typeof Article>;
}

export const ArticleRepository = Symbol('ArticleRepository');
