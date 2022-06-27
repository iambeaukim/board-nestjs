import { prop, modelOptions } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class Article {
  @prop()
  _id?: string;

  @prop()
  title: string;

  @prop()
  content: string;

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;

  @prop({ default: true })
  isActive: boolean;

  createId() {
    this._id = uuid();
  }
}
