import { Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  infos: string[];
  technologies: string[];
  liveUrl?: string;
  frontendRepoUrl?: string;
  backendRepoUrl?: string;
  image: string;
  category: string;
  status: string;
  startDate: Date;
  endDate: Date;
  isPublished: boolean;
  isDeleted: boolean;
}
