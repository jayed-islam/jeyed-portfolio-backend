import { Document, Types } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  description: string;
  banner: string;
  author: Types.ObjectId;
  category: string;
  tags: string[];
  isPublished: boolean;
  isDeleted: boolean;
}
