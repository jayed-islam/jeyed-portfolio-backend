import express, { NextFunction, Request, Response } from 'express';
import { SkillController } from './skill.controller';
import { SkillValidation } from './skill.validation';
import validateRequest from '../../middlewares/validateRequest';
import { multerUpload } from '../../config/multer.config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const router = express.Router();

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
  validateRequest(SkillValidation.createSkillValidationSchema),
  SkillController.createSkill,
);

router.post(
  '/list',
  validateRequest(SkillValidation.getSkillListValidation),
  SkillController.getSkillList,
);

router.get('/:skillId', SkillController.getSingleSkillById);

router.put(
  '/:skillId',
  validateRequest(SkillValidation.updateSkillValidationSchema),
  SkillController.updateSkill,
);

router.delete('/:skillId', SkillController.deleteSkill);

export const SkillRoutes = router;
