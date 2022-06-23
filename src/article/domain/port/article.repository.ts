import { Article } from "../model/article.model";

export interface ArticleRepository {
    save(article: Article): Promise<Article>;
    findAll(): Promise<Article[] | null>;
  }
  
  export const ArticleRepository = Symbol('ArticleRepository'); //TODO: R&D