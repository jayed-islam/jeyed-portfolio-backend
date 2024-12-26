import { Document } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  description: string;
  company: string;
  companyLogo: string;
  startDate: Date;
  endDate: Date;
  companyWebsite: string;
  activities: string[];
  location: string;
  isDeleted?: boolean;
  isCurrentWorking?: boolean;
}
