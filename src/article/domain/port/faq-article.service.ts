import { Inject, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { ArticleRepository } from './article.repository';
import { Article } from '../model/article.model';
import { ArticleService } from './article.service';
import { ArticleResponse } from '../../adapter/dto/article.response';

@Injectable()
export class FaqArticleService implements ArticleService {
  constructor(
    @Inject(ArticleRepository)
    private readonly articleRepository: ArticleRepository,
  ) {}

  async createArticle(article: Article): Promise<Article> {
    console.log('Create FAQ Article');
    return article;
  }

  async downloadExcel() {
    console.log('Download FAQ Article');
  }

  async getArticles(): Promise<Article[] | null> {
    return await this.articleRepository.findAll();
  }
}
