import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterService } from './services';
import {
  AcademicSemesterFilterQuery,
  AcademicSemesterOptionsQuery,
} from './constants';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.insertToDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicSemesterFilterQuery);
  const options = pick(req.query, AcademicSemesterOptionsQuery);
  const result = await academicSemesterService.getAllFromDb(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters found',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester data fatched',
    data: result === null ? 'Data not found for this ID' : result,
  });
});

const updateDataById = catchAsync(async (req: Request, res: Response) => {
  const options = { id: req.params.id, body: req.body };
  const result = await academicSemesterService.updateDataById(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester data updated successfully',
    data: result,
  });
});

const deleteDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.deleteDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester deleted successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
