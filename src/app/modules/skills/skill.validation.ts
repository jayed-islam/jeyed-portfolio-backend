import { z } from 'zod';

const createSkillValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(1, 'Name cannot be empty'),
    description: z.string().optional(),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
      required_error: 'Level is required',
    }),
    category: z.string().optional(),
  }),
});

const updateSkillValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
    category: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const getSkillListValidation = z.object({
  query: z.object({
    searchTerm: z.string().optional(),
    category: z.string().optional(),
    page: z.number().optional().default(1),
    limit: z.number().optional().default(10),
  }),
});

export const SkillValidation = {
  createSkillValidationSchema,
  updateSkillValidationSchema,
  getSkillListValidation,
};
