import { z } from 'zod';

const createExperienceValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, { message: 'Title must be at least 1 character long' })
      .trim(),
    description: z
      .string({ required_error: 'Description is required' })
      .min(1, { message: 'Description must be at least 1 character long' })
      .trim(),
    company: z
      .string({ required_error: 'Company name is required' })
      .min(1, { message: 'Company name must not be empty' })
      .trim(),
    companyWebsite: z
      .string({ required_error: 'Company website is required' })
      .min(1, { message: 'Company website must not be empty' })
      .trim(),
    companyLogo: z
      .string({ required_error: 'companyLogo is required' })
      .min(1, { message: 'companyLogo must not be empty' })
      .trim(),
    startDate: z
      .string({ required_error: 'Start Date is required' })
      .transform((value) => new Date(value)),
    endDate: z
      .string()
      .optional()
      .transform((value) => (value ? new Date(value) : undefined)),
    location: z
      .string({ required_error: 'Location is required' })
      .min(1, { message: 'Location must not be empty' })
      .trim(),
    isCurrentWorking: z.boolean().optional(),
  }),
});

const updateExperienceValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Title must be at least 1 character long' })
      .optional(),
    description: z
      .string()
      .min(5, { message: 'Description must be at least 5 characters' })
      .optional(),
    company: z.string().optional(),
    location: z.string().optional(),
    startDate: z
      .string({ required_error: 'Start Date is required' })
      .transform((value) => new Date(value)),
    endDate: z
      .string()
      .optional()
      .transform((value) => (value ? new Date(value) : undefined)),
    updatedBy: z.string().optional(),
    isDeleted: z.boolean().optional(),
    isCurrentWorking: z.boolean().optional(),
  }),
});

const getExperienceListValidation = z.object({
  body: z.object({
    searchTerm: z.string().optional(),
    company: z.string().optional(),
    page: z.number().optional().default(1),
    limit: z.number().optional().default(10),
    minStartDate: z.date().optional(),
    maxEndDate: z.date().optional(),
  }),
});

export const ExperienceValidation = {
  createExperienceValidationSchema,
  updateExperienceValidationSchema,
  getExperienceListValidation,
};
