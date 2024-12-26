import express, { NextFunction, Request, Response } from 'express';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation'; // Assuming you have validation schema
import validateRequest from '../../middlewares/validateRequest';
import { multerUpload } from '../../config/multer.config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const router = express.Router();

// Route to create a new blog
router.post(
  '/',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body && req.body.data) {
      req.body = JSON.parse(req.body.data);
    } else {
      throw new AppError(
        httpStatus.CONFLICT,
        'Request body data is undefined or invalid JSON',
      );
    }
    next();
  },
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);

// Route to get a list of blogs with optional filters and pagination
router.post(
  '/list',
  validateRequest(BlogValidation.getBlogListValidation),
  BlogController.getBlogList,
);

// Route to get a single blog by ID
router.get('/:blogId', BlogController.getSingleBlogById);

// Route to update an existing blog by ID
router.put(
  '/:blogId',
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogController.updateBlog,
);

// Route to delete a blog by ID
router.delete('/:blogId', BlogController.deleteBlog);

export const BlogRoutes = router;
