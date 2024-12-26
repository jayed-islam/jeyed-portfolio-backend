import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProjectServices } from './project.service';

const createProject = catchAsync(async (req: Request, res: Response) => {
  const projectData = req.body;
  const file = req.file;
  console.log('fie', file);
  const project = await ProjectServices.createProject(projectData, file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Project Created Successfully!',
    data: project,
  });
});

const getProjectList = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, searchTerm } = req.body;
  const { projects, pagination } = await ProjectServices.getProjectList(
    String(searchTerm),
    Number(page),
    Number(limit),
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects Retrieved Successfully!',
    data: { projects, pagination },
  });
});

const getSingleProjectById = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await ProjectServices.getSingleProjectById(projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Retrieved Successfully!',
    data: project,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const projectData = req.body;
  const updatedProject = await ProjectServices.updateProject(
    projectId,
    projectData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Updated Successfully!',
    data: updatedProject,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params;
  await ProjectServices.deleteProject(projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Deleted Successfully!',
    data: null,
  });
});

export const ProjectController = {
  createProject,
  getProjectList,
  getSingleProjectById,
  updateProject,
  deleteProject,
};
