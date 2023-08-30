import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/routes';
import { BuildingRoutes } from '../modules/building/routes';
<<<<<<< HEAD
import { CourseRoutes } from '../modules/course/routes';
=======
import { RoomRoutes } from '../modules/room/routes';
>>>>>>> ed7bfe55ee476fd015d33f56ec392b88f2f495d0

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
<<<<<<< HEAD
    path: '/course',
    route: CourseRoutes,
=======
    path: '/room',
    route: RoomRoutes,
>>>>>>> ed7bfe55ee476fd015d33f56ec392b88f2f495d0
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
