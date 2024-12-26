import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ExperienceServices } from './company.service';

const createExperience = catchAsync(async (req: Request, res: Response) => {
  const experienceData = req.body;
  const experience = await ExperienceServices.createExperience(experienceData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Experience Created Successfully!',
    data: experience,
  });
});

const getExperienceList = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, searchTerm } = req.body;
  const { experiences, pagination } =
    await ExperienceServices.getExperienceList(
      String(searchTerm),
      Number(page),
      Number(limit),
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experiences Retrieved Successfully!',
    data: { experiences, pagination },
  });
});

const getSingleExperienceById = catchAsync(
  async (req: Request, res: Response) => {
    const { experienceId } = req.params;
    const experience =
      await ExperienceServices.getSingleExperienceById(experienceId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Experience Retrieved Successfully!',
      data: experience,
    });
  },
);

const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const { experienceId } = req.params;
  const experienceData = req.body;
  const updatedExperience = await ExperienceServices.updateExperience(
    experienceId,
    experienceData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience Updated Successfully!',
    data: updatedExperience,
  });
});

const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  const { experienceId } = req.params;
  await ExperienceServices.deleteExperience(experienceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience Deleted Successfully!',
    data: null,
  });
});

export const ExperienceController = {
  createExperience,
  getExperienceList,
  getSingleExperienceById,
  updateExperience,
  deleteExperience,
};
