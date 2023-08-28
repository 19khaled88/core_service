import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/routes';
import { BuildingRoutes } from '../modules/building/routes';
import { RoomRoutes } from '../modules/room/routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/building',
    route: BuildingRoutes,
  },
  {
    path: '/room',
    route: RoomRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
