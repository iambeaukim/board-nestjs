import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/board'),
    ArticleModule,
  ],
})
export class AppModule {}
