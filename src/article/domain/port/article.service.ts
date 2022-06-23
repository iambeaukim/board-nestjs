import { Inject, Injectable, Logger } from '@nestjs/common';
import { ArticleResponse } from '../../adapter/dto/article.response'
import * as XLSX from 'xlsx';
import { ArticleRepository } from './article.repository';
import { Article } from '../model/article.model';

@Injectable()
export class ArticleService {
    private readonly logger = new Logger(ArticleService.name);

    //TODO
    constructor(@Inject(ArticleRepository) private readonly articleRepository: ArticleRepository) {}

    async createArticle(article: Article) {
        const createdArticle = await this.articleRepository.save(article);
        return ArticleResponse.fromEntity(createdArticle);
    }

    async downloadExcel() {
        const articles = await this.getArticles();

        // 1. workbook 생성
        const workbook = XLSX.utils.book_new();
        
        // 2. sheet 생성
        const worksheet = XLSX.utils.json_to_sheet(articles);
        
        // 3. 새로만든 sheet에 이름을 주고 workbook에 삽입
        XLSX.utils.book_append_sheet(workbook, worksheet, '게시물');

        // 4. 엑셀파일 생성
        return XLSX.write(workbook, {bookType: 'xlsx', type: 'base64'});
    }

    async getArticles() {
        const articles = await this.articleRepository.findAll();
        return articles.map((data) => ArticleResponse.fromEntity(data));
    }

}
