import express from 'express';
import { AcademicSemesterController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './validation';

const router = express.Router();

router.get('/get', AcademicSemesterController.getAllFromDB);
router.post(
  '/create',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.insertIntoDB
);

export const AcademicSemesterRoutes = router;
