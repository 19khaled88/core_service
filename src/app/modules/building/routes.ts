import express from 'express';
import { BuildingController } from './controller';

const router = express.Router();

router.get('/get/:id', BuildingController.getDataById);
router.get('/get', BuildingController.getAllData);
router.put('/update/:id', BuildingController.updateDataById);
router.delete('/delete/:id', BuildingController.deletedDataById);
router.post('/create', BuildingController.insertIntoDB);

export const BuildingRoutes = router;
