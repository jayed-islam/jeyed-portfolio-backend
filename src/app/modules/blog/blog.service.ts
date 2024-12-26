/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Blog } from './blog.model';
import { IBlog } from './blog.interface';

const createBlog = async (blogData: IBlog, file?: any) => {
  if (file) {
    blogData.banner = file.path;
  }

  const newBlog = await Blog.create(blogData);
  return newBlog;
};

const getBlogList = async (page: number, limit: number) => {
  const query: any = { isDeleted: false };

  const skip = (page - 1) * limit;
  const blogs = await Blog.find(query).skip(skip).limit(limit);
  const totalCount = await Blog.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  const pagination = {
    totalItems: totalCount,
    totalPages,
    currentPage: page,
    itemsPerPage: limit,
  };

  return { blogs, pagination };
};

const getSingleBlogById = async (blogId: string) => {
  const blog = await Blog.findById(blogId).where({ isDeleted: false });
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

const updateBlog = async (blogId: string, blogData: any) => {
  const blog = await Blog.findByIdAndUpdate(blogId, blogData, {
    new: true,
  });
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

const deleteBlog = async (blogId: string) => {
  const blog = await Blog.findByIdAndUpdate(
    blogId,
    { isDeleted: true },
    { new: true },
  );
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

export const BlogServices = {
  createBlog,
  getBlogList,
  getSingleBlogById,
  updateBlog,
  deleteBlog,
};
