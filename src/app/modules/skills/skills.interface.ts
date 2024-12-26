import { Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  description: string;
  logo: string;
  level: string;
  category: string;
  isDeleted: boolean;
}
