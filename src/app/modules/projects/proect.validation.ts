import { z } from 'zod';

const createProjectValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, { message: 'Title must be at least 1 character long' })
      .trim(),
    description: z
      .string({ required_error: 'Description is required' })
      .min(1, { message: 'Description must be at least 1 character long' })
      .trim(),
    technologies: z
      .array(z.string())
      .min(1, { message: 'At least one technology must be provided' })
      .nonempty({ message: 'Technologies array cannot be empty' }),
    infos: z.array(z.string()).optional(),
    liveUrl: z.string().url().optional(),
    frontendRepoUrl: z.string().url().optional(),
    backendRepoUrl: z.string().url().optional(),
    image: z.string().url({ message: 'Image must be a valid URL' }).optional(),
    category: z.string().optional(),
    isFeatured: z.boolean().optional(),
    status: z.enum(['IN_PROGRESS', 'COMPLETED', 'CANCELLED'], {
      required_error: 'Status is required',
    }),
    startDate: z
      .string({ required_error: 'Start Date is required' })
      .transform((value) => new Date(value)),
    endDate: z
      .string()
      .optional()
      .transform((value) => (value ? new Date(value) : undefined)),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Title must be at least 1 character long' })
      .optional(),
    description: z
      .string()
      .min(5, { message: 'Description must be at least 5 characters' })
      .optional(),
    technologies: z.array(z.string()).optional(),
    infos: z.array(z.string()).optional(),
    liveUrl: z.string().url().optional(),
    frontendRepoUrl: z.string().url().optional(),
    backendRepoUrl: z.string().url().optional(),
    image: z.string().url().optional(),
    category: z.string().optional(),
    isFeatured: z.boolean().optional(),
    status: z.enum(['IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
    startDate: z
      .string()
      .transform((value) => new Date(value))
      .optional(),
    endDate: z
      .string()
      .optional()
      .transform((value) => (value ? new Date(value) : undefined)),
    updatedBy: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const getProjectListValidation = z.object({
  query: z.object({
    searchTerm: z.string().optional(),
    category: z.string().optional(),
    page: z.number().int().optional().default(1),
    limit: z.number().int().optional().default(10),
    minStartDate: z.date().optional(),
    maxEndDate: z.date().optional(),
  }),
});

export const ProjectValidation = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
  getProjectListValidation,
};
