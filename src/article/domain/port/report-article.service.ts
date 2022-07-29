import { Inject, Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { Article } from '../model/article.model';
import { ArticleService } from './article.service';

@Injectable()
export class ReportArticleService implements ArticleService {
  constructor(
    @Inject(ArticleRepository)
    private readonly articleRepository: ArticleRepository,
  ) {}

  async createArticle(article: Article): Promise<Article> {
    console.log('Create Report Article');
    return article;
  }

  async downloadExcel() {
    console.log('Download Report Article');
  }

  async getArticles(): Promise<Article[] | null> {
    return await this.articleRepository.findAll();
  }
}
