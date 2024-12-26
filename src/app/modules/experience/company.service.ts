/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Experience } from './experience.model';

const createExperience = async (experienceData: any) => {
  const newExperience = await Experience.create(experienceData);
  return newExperience;
};

const getExperienceList = async (
  searchTerm: string,
  page: number,
  limit: number,
) => {
  const query: any = { isDeleted: false };

  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    query.$or = [
      { title: regex },
      { description: regex },
      { company: regex },
      { location: regex },
    ];
  }

  const skip = (page - 1) * limit;
  const experiences = await Experience.find(query).skip(skip).limit(limit);
  const totalCount = await Experience.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  const pagination = {
    totalItems: totalCount,
    totalPages,
    currentPage: page,
    itemsPerPage: limit,
  };

  return { experiences, pagination };
};

const getSingleExperienceById = async (experienceId: string) => {
  const experience = await Experience.findById(experienceId).where({
    isDeleted: false,
  });
  if (!experience) {
    throw new AppError(httpStatus.NOT_FOUND, 'Experience not found');
  }
  return experience;
};

const updateExperience = async (experienceId: string, experienceData: any) => {
  const experience = await Experience.findByIdAndUpdate(
    experienceId,
    experienceData,
    { new: true },
  );
  if (!experience) {
    throw new AppError(httpStatus.NOT_FOUND, 'Experience not found');
  }
  return experience;
};

const deleteExperience = async (experienceId: string) => {
  const experience = await Experience.findByIdAndUpdate(
    experienceId,
    { isDeleted: true },
    { new: true },
  );
  if (!experience) {
    throw new AppError(httpStatus.NOT_FOUND, 'Experience not found');
  }
  return experience;
};

export const ExperienceServices = {
  createExperience,
  getExperienceList,
  getSingleExperienceById,
  updateExperience,
  deleteExperience,
};
