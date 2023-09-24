import express from 'express';
import { CourseController } from './controller';

const route = express.Router();

route.post('/create', CourseController.insertIntoDB);
route.get('/get', CourseController.getData);
route.get('/single/:id', CourseController.getDataById);
route.put('/update/:id', CourseController.updateDataById);
route.delete('/delete/:id', CourseController.deleteDataById);

export const CourseRoutes = route;
