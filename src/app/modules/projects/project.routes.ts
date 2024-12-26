import { NextFunction, Request, Response, Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { ProjectController } from './project.controller';
import { ProjectValidation } from './proect.validation';
import { multerUpload } from '../../config/multer.config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.vendor),
  multerUpload.array('file'),
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
  validateRequest(ProjectValidation.createProjectValidationSchema),
  ProjectController.createProject,
);

router.get('/list', ProjectController.getProjectList);

router.get('/:projectId', ProjectController.getSingleProjectById);

router.put(
  '/:projectId',
  auth(USER_ROLE.admin, USER_ROLE.vendor),
  validateRequest(ProjectValidation.updateProjectValidationSchema),
  ProjectController.updateProject,
);

router.delete(
  '/:projectId',
  auth(USER_ROLE.admin),
  ProjectController.deleteProject,
);

export const ProjectRoutes = router;
