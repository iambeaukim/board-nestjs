import { Inject, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { IArticleRepository } from '../../domain/repository/article.repository';
import { Article } from '../../domain/entity/article.model';
import { ArticleService } from './article.service';
import { ArticleServiceDto } from '../dto/article.service.dto';

@Injectable()
export class GeneralArticleService implements ArticleService {
  constructor(
    @Inject(IArticleRepository)
    private readonly articleRepository: IArticleRepository,
  ) {}

  async createArticle(articleServiceDto: ArticleServiceDto): Promise<ArticleServiceDto> {
    const article = articleServiceDto.toEntity();
    return ArticleServiceDto.fromEntity(await this.articleRepository.save(article));
  }

  async downloadExcel() {
    const articles = await this.findArticles();
    const response = articles.map(data => ArticleServiceDto.fromEntity(data));

    // 1. workbook 생성
    const workbook = XLSX.utils.book_new();

    // 2. sheet 생성
    const worksheet = XLSX.utils.json_to_sheet(response);

    // 3. 새로만든 sheet에 이름을 주고 workbook에 삽입
    XLSX.utils.book_append_sheet(workbook, worksheet, '게시물');

    // 4. 엑셀파일 생성
    return XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
  }

  async findArticles(): Promise<Article[] | null> {
    return await this.articleRepository.findAll();
  }
}
