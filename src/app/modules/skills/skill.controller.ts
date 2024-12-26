import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { SkillServices } from './skill.service';

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const skillData = req.body;
  const file = req.file;
  const skill = await SkillServices.createSkill(skillData, file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Skill created successfully!',
    data: skill,
  });
});

const getSkillList = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, searchTerm } = req.query;
  const { skills, pagination } = await SkillServices.getSkillList(
    String(searchTerm),
    Number(page),
    Number(limit),
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skills retrieved successfully!',
    data: { skills, pagination },
  });
});

const getSingleSkillById = catchAsync(async (req: Request, res: Response) => {
  const { skillId } = req.params;
  const skill = await SkillServices.getSingleSkillById(skillId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill retrieved successfully!',
    data: skill,
  });
});

const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const { skillId } = req.params;
  const skillData = req.body;
  const updatedSkill = await SkillServices.updateSkill(skillId, skillData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill updated successfully!',
    data: updatedSkill,
  });
});

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const { skillId } = req.params;
  await SkillServices.deleteSkill(skillId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill deleted successfully!',
    data: null,
  });
});

export const SkillController = {
  createSkill,
  getSkillList,
  getSingleSkillById,
  updateSkill,
  deleteSkill,
};
