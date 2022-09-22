import { Inject, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { ArticleRepository } from '../domain/repository/article.repository';
import { Article } from '../domain/entity/article.model';
import { ArticleService } from './article.service';
import { ArticleResponse } from '../interface/dto/article.response';

@Injectable()
export class FaqArticleService implements ArticleService {
  constructor(
    @Inject(ArticleRepository)
    private readonly articleRepository: ArticleRepository,
  ) {}

  async createArticle(article: Article): Promise<Article> {
    article.createUUId();
    return await this.articleRepository.save(article);
  }

  async downloadExcel() {
    const articles = await this.getArticles();
    const response = articles.map(data => ArticleResponse.fromEntity(data));

    // 1. workbook 생성
    const workbook = XLSX.utils.book_new();

    // 2. sheet 생성
    const worksheet = XLSX.utils.json_to_sheet(response);

    // 3. 새로만든 sheet에 이름을 주고 workbook에 삽입
    XLSX.utils.book_append_sheet(workbook, worksheet, '게시물');

    // 4. 엑셀파일 생성
    return XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
  }

  async getArticles(): Promise<Article[] | null> {
    return await this.articleRepository.findAll();
  }
}
