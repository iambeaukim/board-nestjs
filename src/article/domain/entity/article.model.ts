import { modelOptions, prop } from '@typegoose/typegoose';
import { ArticleType } from '../enum/article.type';
import { ObjectId } from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class Article {
  _id!: ObjectId;

  @prop()
  title: string;

  @prop()
  content: string;

  @prop({ enum: ArticleType, type: String })
  type: ArticleType;

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;

  @prop({ default: true })
  isActive: boolean;
}
