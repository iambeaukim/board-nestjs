import { ArticleResponseDto } from '../../../interface/dto/article.response.dto';

export interface IReadArticleRepository {
  getArticles(): Promise<ArticleResponseDto[] | null>;
}

export const IReadArticleRepository = Symbol('IReadArticleRepository');
