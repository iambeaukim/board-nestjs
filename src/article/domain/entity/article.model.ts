import { modelOptions, prop } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';
import { ArticleType } from '../enum/article.type';

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class Article {
  @prop()
  _id?: string;

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

  createUUId() {
    this._id = uuid();
  }
}
