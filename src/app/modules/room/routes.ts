import express from 'express';
import { RoomController } from './controller';

const router = express.Router();

router.get('/get', RoomController.getData);
router.get('/single/:id', RoomController.getDataById);
router.post('/create', RoomController.insertIntoDB);
router.put('/update/:id', RoomController.updateDataById);
router.delete('/delete/:id', RoomController.deletedDataById);

export const RoomRoutes = router;
