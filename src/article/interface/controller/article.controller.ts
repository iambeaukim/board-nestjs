import { Body, Controller, Get, Header, HttpException, HttpStatus, Logger, Post, Query, Res, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '../../../response.interceptor';
import { ArticleRequest } from '../dto/article.request';
import { ArticleResponse } from '../dto/article.response';
import { ArticleService, FaqArticleServiceSymbol, GeneralArticleServiceSymbol, ReportArticleServiceSymbol } from '../../application/article.service';
import { ModuleRef } from '@nestjs/core';
import { ArticleType } from '../../domain/enum/article.type';

@Controller('/articles')
export class ArticleController {
  private readonly logger = new Logger(ArticleController.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  @UseInterceptors(ResponseInterceptor)
  @Post()
  async createArticle(@Body() request: ArticleRequest) {
    console.log('ArticleRequest : ' + JSON.stringify(request));
    const articleService = this.moduleRef.get<ArticleService>(this.getServiceSymbol(request.type));

    return ArticleResponse.fromEntity(await articleService.createArticle(request.toEntity()));
  }

  @Get('/excel')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=articles.xlsx')
  async downloadExcel(@Res() response, @Query() type: ArticleType) {
    const articleService = this.moduleRef.get<ArticleService>(this.getServiceSymbol(type));
    response.status(HttpStatus.OK).send(Buffer.from(await articleService.downloadExcel(), 'base64'));
  }

  getServiceSymbol(type: ArticleType) {
    switch (type) {
      case ArticleType.GENERAL:
        return GeneralArticleServiceSymbol;
      case ArticleType.REPORT:
        return ReportArticleServiceSymbol;
      case ArticleType.FAQ:
        return FaqArticleServiceSymbol;
      default:
        throw new HttpException('CONFLICT', HttpStatus.CONFLICT);
    }
  }
}
