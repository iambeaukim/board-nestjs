import { Article } from '../entity/article.model';

export interface IArticleRepository {
  save(article: Article): Promise<Article>;
  findAll(): Promise<Article[] | null>;
}

export const IArticleRepository = Symbol('IArticleRepository');
