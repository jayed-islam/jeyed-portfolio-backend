import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Title is required' })
      .max(100, { message: 'Title must not exceed 100 characters' })
      .trim(),
    description: z.string().optional(),
    content: z.string().min(1, { message: 'Content is required' }).trim(),
    author: z.string().min(1, { message: 'Author is required' }).trim(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Title is required' })
      .max(100, { message: 'Title must not exceed 100 characters' })
      .optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isPublished: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const getBlogListValidation = z.object({
  body: z.object({
    page: z.number().optional().default(1),
    limit: z.number().optional().default(10),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
  getBlogListValidation,
};
