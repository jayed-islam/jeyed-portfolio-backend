import { Router } from 'express';
import { ExperienceController } from './experience.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { ExperienceValidation } from './experience.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ExperienceValidation.createExperienceValidationSchema),
  ExperienceController.createExperience,
);

router.get(
  '/list',
  validateRequest(ExperienceValidation.getExperienceListValidation),
  ExperienceController.getExperienceList,
);

router.get('/:experienceId', ExperienceController.getSingleExperienceById);

router.put(
  '/:experienceId',
  auth(USER_ROLE.admin),
  validateRequest(ExperienceValidation.updateExperienceValidationSchema),
  ExperienceController.updateExperience,
);

router.delete(
  '/:experienceId',
  auth(USER_ROLE.admin),
  ExperienceController.deleteExperience,
);

export const ExperienceRoutes = router;
