import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from './domain/entity/article.model';
import { ArticleController } from './interface/controller/article.controller';
import { ArticleRepository } from './domain/repository/article.repository';
import { ArticleMongoRepository } from './infra/mongo/articleMongo.repository';
import { FaqArticleServiceSymbol, GeneralArticleServiceSymbol, ReportArticleServiceSymbol } from './application/article.service';
import { ReportArticleService } from './application/report-article.service';
import { GeneralArticleService } from './application/general-article.service';
import { FaqArticleService } from './application/faq-article.service';

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
