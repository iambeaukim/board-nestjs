import { Article } from '../model/article.model';

export interface ArticleService {
  createArticle(article: Article): Promise<Article>;
  downloadExcel();
  getArticles(): Promise<Article[] | null>;
}

export const GeneralArticleServiceSymbol = Symbol('GeneralArticleService');
export const ReportArticleServiceSymbol = Symbol('ReportArticleService');
export const FaqArticleServiceSymbol = Symbol('FaqArticleService');
