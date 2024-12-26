import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { ProjectRoutes } from '../modules/projects/project.routes';
import { ExperienceRoutes } from '../modules/experience/experience.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { SkillRoutes } from '../modules/skills/skill.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
  {
    path: '/experience',
    route: ExperienceRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: '/skill',
    route: SkillRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
