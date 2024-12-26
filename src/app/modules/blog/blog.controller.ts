import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blogData = req.body;
  const file = req.file;
  const blog = await BlogServices.createBlog(blogData, file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog Created Successfully!',
    data: blog,
  });
});

const getBlogList = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;

  const { blogs, pagination } = await BlogServices.getBlogList(
    Number(page),
    Number(limit),
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs Retrieved Successfully!',
    data: { blogs, pagination },
  });
});

const getSingleBlogById = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const blog = await BlogServices.getSingleBlogById(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Retrieved Successfully!',
    data: blog,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const blogData = req.body;
  const updatedBlog = await BlogServices.updateBlog(blogId, blogData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Updated Successfully!',
    data: updatedBlog,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  await BlogServices.deleteBlog(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Deleted Successfully!',
    data: null,
  });
});

export const BlogController = {
  createBlog,
  getBlogList,
  getSingleBlogById,
  updateBlog,
  deleteBlog,
};
