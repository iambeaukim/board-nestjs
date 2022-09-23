import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from './domain/entity/article.model';
import { ArticleController } from './interface/controller/article.controller';
import { IArticleRepository } from './domain/repository/article.repository';
import { ArticleMongoRepository } from './infra/mongo/article.mongo.repository';
import { FaqArticleServiceSymbol, GeneralArticleServiceSymbol, ReportArticleServiceSymbol } from './application/service/article.service';
import { ReportArticleService } from './application/service/report-article.service';
import { GeneralArticleService } from './application/service/general-article.service';
import { FaqArticleService } from './application/service/faq-article.service';
import { IReadArticleRepository } from './domain/repository/read/read-article.repository';
import { ReadArticleMongoRepository } from './infra/mongo/read/read-article.mongo.repository';

@Module({
  imports: [TypegooseModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [
    { provide: GeneralArticleServiceSymbol, useClass: GeneralArticleService },
    { provide: ReportArticleServiceSymbol, useClass: ReportArticleService },
    { provide: FaqArticleServiceSymbol, useClass: FaqArticleService },
    { provide: IArticleRepository, useClass: ArticleMongoRepository },
    { provide: IReadArticleRepository, useClass: ReadArticleMongoRepository },
  ],
})
export class ArticleModule {}
