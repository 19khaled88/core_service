import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BuildingService } from './services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New building data inserted successfuly',
    data: result,
  });
});

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.getAllData();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Building data found',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data found by ID',
    data: result,
  });
});

const updateDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.updateDataById(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building data updated successfully',
    data: result,
  });
});

const deletedDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.deletedDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building data deleted successfully',
    data: result,
  });
});

export const BuildingController = {
  insertIntoDB,
  getAllData,
  getDataById,
  updateDataById,
  deletedDataById,
};
