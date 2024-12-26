/* eslint-disable @typescript-eslint/no-explicit-any */
import { Project } from './project.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { IProject } from './project.interface';

const createProject = async (projectData: IProject, file?: any) => {
  console.log('fie 2', file);
  if (file) {
    projectData.image = file.path;
  }

  const newProject = await Project.create(projectData);
  return newProject;
};

const getProjectList = async (
  searchTerm: string,
  page: number,
  limit: number,
) => {
  const query: any = { isDeleted: false };

  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    query.$or = [{ title: regex }, { description: regex }];
  }

  const skip = (page - 1) * limit;
  const projects = await Project.find(query).skip(skip).limit(limit);
  const totalCount = await Project.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  const pagination = {
    totalItems: totalCount,
    totalPages,
    currentPage: page,
    itemsPerPage: limit,
  };

  return { projects, pagination };
};

const getSingleProjectById = async (projectId: string) => {
  const project = await Project.findById(projectId).where({ isDeleted: false });
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
  }
  return project;
};

const updateProject = async (projectId: string, projectData: any) => {
  const project = await Project.findByIdAndUpdate(projectId, projectData, {
    new: true,
  });
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
  }
  return project;
};

const deleteProject = async (projectId: string) => {
  const project = await Project.findByIdAndUpdate(
    projectId,
    { isDeleted: true },
    { new: true },
  );
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
  }
  return project;
};

export const ProjectServices = {
  createProject,
  getProjectList,
  getSingleProjectById,
  updateProject,
  deleteProject,
};
