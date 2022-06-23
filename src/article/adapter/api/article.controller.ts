import { Body, Controller, Get, Header, HttpStatus, Logger, Post, Res, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '../../../response.interceptor';
import { ArticleService } from '../../domain/port/article.service';
import { ArticleRequest } from '../dto/article.request';

@Controller('articles')
export class ArticleController {
    private readonly logger = new Logger(ArticleController.name);

    constructor(private readonly articleService: ArticleService) {}

    @UseInterceptors(ResponseInterceptor)
    @Post()
    createArticle(@Body() request: ArticleRequest) {
        this.logger.debug(`Article: ${JSON.stringify(request)}`);
        const createdArticle = this.articleService.createArticle(request.toEntity());
        return createdArticle
    }

    @Get('/excel')
    @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    @Header('Content-Disposition', 'attachment; filename=articles.xlsx')
    async downloadExcel(@Res() response) {
        response.status(HttpStatus.OK).send(Buffer.from(await this.articleService.downloadExcel(), 'base64'));
    }

}