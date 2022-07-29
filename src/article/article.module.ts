import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from './domain/model/article.model';
import { ArticleController } from './adapter/api/article.controller';
import { ArticleRepository } from './domain/port/article.repository';
import { ArticleMongoRepository } from './adapter/db/articleMongo.repository';
import { FaqArticleServiceSymbol, GeneralArticleServiceSymbol, ReportArticleServiceSymbol } from './domain/port/article.service';
import { ReportArticleService } from './domain/port/report-article.service';
import { GeneralArticleService } from './domain/port/general-article.service';
import { FaqArticleService } from './domain/port/faq-article.service';

@Module({
  imports: [TypegooseModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [
    { provide: GeneralArticleServiceSymbol, useClass: GeneralArticleService },
    { provide: ReportArticleServiceSymbol, useClass: ReportArticleService },
    { provide: FaqArticleServiceSymbol, useClass: FaqArticleService },
    { provide: ArticleRepository, useClass: ArticleMongoRepository },
  ],
})
export class ArticleModule {}
