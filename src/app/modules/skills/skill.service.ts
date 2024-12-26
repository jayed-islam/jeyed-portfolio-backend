/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skill } from './skill.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { ISkill } from './skills.interface';

const createSkill = async (skillData: ISkill, file?: any) => {
  if (file) {
    skillData.logo = file.path;
  }
  const newSkill = await Skill.create(skillData);
  return newSkill;
};

const getSkillList = async (
  searchTerm: string,
  page: number,
  limit: number,
) => {
  const query: any = { isDeleted: false };

  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    query.$or = [{ name: regex }, { description: regex }];
  }

  const skip = (page - 1) * limit;
  const skills = await Skill.find(query).skip(skip).limit(limit);
  const totalCount = await Skill.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  const pagination = {
    totalItems: totalCount,
    totalPages,
    currentPage: page,
    itemsPerPage: limit,
  };

  return { skills, pagination };
};

const getSingleSkillById = async (skillId: string) => {
  const skill = await Skill.findById(skillId).where({ isDeleted: false });
  if (!skill) {
    throw new AppError(httpStatus.NOT_FOUND, 'Skill not found');
  }
  return skill;
};

const updateSkill = async (skillId: string, skillData: any) => {
  const skill = await Skill.findByIdAndUpdate(skillId, skillData, {
    new: true,
  });
  if (!skill) {
    throw new AppError(httpStatus.NOT_FOUND, 'Skill not found');
  }
  return skill;
};

const deleteSkill = async (skillId: string) => {
  const skill = await Skill.findByIdAndUpdate(
    skillId,
    { isDeleted: true },
    { new: true },
  );
  if (!skill) {
    throw new AppError(httpStatus.NOT_FOUND, 'Skill not found');
  }
  return skill;
};

export const SkillServices = {
  createSkill,
  getSkillList,
  getSingleSkillById,
  updateSkill,
  deleteSkill,
};
