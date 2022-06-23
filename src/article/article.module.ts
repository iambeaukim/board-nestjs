import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from './domain/model/article.model';
import { ArticleController } from './adapter/api/article.controller';
import { ArticleService } from './domain/port/article.service';
import { ArticleRepository } from './domain/port/article.repository';
import { ArticleMongoRepository } from './adapter/db/articleMongo.repository';

@Module({
  imports: [TypegooseModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    { provide: ArticleRepository, useClass: ArticleMongoRepository },
  ],
})
export class ArticleModule {}
