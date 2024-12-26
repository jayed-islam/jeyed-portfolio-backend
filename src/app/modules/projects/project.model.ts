import { model, Schema } from 'mongoose';
import { IProject } from './project.interface';

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    liveUrl: {
      type: String,
      required: false,
    },
    frontendRepoUrl: {
      type: String,
      required: false,
    },
    backendRepoUrl: {
      type: String,
      required: false,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Project = model<IProject>('Project', projectSchema);
