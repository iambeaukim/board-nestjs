import { prop, modelOptions } from "@typegoose/typegoose";
import { v4 as uuidv4 } from 'uuid';

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class Article {

  @prop({default: function genUUID() {
    return uuidv4()
  }})
  _id?: string;

  @prop()
  title: string;

  @prop()
  content: string;

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;
  
  @prop({default: true})
  isActive: boolean;
  
}