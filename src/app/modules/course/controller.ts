import { Request } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CourseService } from './services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Couse entry successful',
    data: result,
  });
});

const getData = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getData();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Found all courses',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Found for given ID',
    data: result,
  });
});

const updateDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.updateById(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated for given ID',
    data: result,
  });
});

const deleteDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.deleteById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted for given ID',
    data: result,
  });
});

export const CourseController = {
  insertIntoDB,
  getData,
  getDataById,
  deleteDataById,
  updateDataById,
};
