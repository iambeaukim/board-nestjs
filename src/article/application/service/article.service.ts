import { ArticleServiceDto } from '../dto/article.service.dto';

export interface ArticleService {
  createArticle(articleServiceDto: ArticleServiceDto): Promise<ArticleServiceDto>;
  downloadExcel();
}

export const GeneralArticleServiceSymbol = Symbol('GeneralArticleService');
export const ReportArticleServiceSymbol = Symbol('ReportArticleService');
export const FaqArticleServiceSymbol = Symbol('FaqArticleService');
