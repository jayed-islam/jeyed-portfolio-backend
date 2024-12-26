import { model, Schema } from 'mongoose';
import { IExperience } from './experience.interface';

const experienceSchema = new Schema<IExperience>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String,
      required: true,
    },
    companyWebsite: {
      type: String,
      required: true,
    },
    activities: {
      type: [String],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Experience = model<IExperience>('Experience', experienceSchema);
