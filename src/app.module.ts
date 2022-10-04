import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from './member/member.module';
import { TypeOrmConfig } from './global/config/type-orm.config';

@Module({
  imports: [TypegooseModule.forRoot('mongodb://localhost:27017/board'), TypeOrmModule.forRoot(TypeOrmConfig), ArticleModule, MemberModule],
})
export class AppModule {}
