import { AcademicSemester, PrismaClient, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicSemesterFilterRequest } from './interface';
import { AcademicSemesterSearchableFiels } from './constants';

const prisma = new PrismaClient();

const insertToDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data: data,
  });

  return result;
};

const getAllFromDb = async (
  filters: IAcademicSemesterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: AcademicSemesterSearchableFiels.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicSemester.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
    include:{
      students:true
    }
  });

  const total = await prisma.academicSemester.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<AcademicSemester>
): Promise<AcademicSemester> => {
  const isExist = await prisma.academicSemester.findFirstOrThrow({
    where: {
      id: id,
    },
  });
  if (!isExist.NotFoundError && isExist.id === id) {
    const isUpdated = await prisma.academicSemester.update({
      where: {
        id: id,
      },
      data: payload,
    });
    return isUpdated;
  } else {
    return isExist;
  }
};

const deleteDataById = async (id: string): Promise<AcademicSemester | null> => {
  const isExist = await prisma.academicSemester.findFirstOrThrow({
    where: {
      id: id,
    },
    include:{
      students:true
    }
  });

  if (!isExist.NotFoundError && isExist.id === id) {
    const isDeleted = await prisma.academicSemester.delete({
      where: {
        id: id,
      },
    });
    return isDeleted;
  } else {
    return isExist;
  }
};

export const academicSemesterService = {
  insertToDB,
  getAllFromDb,
  getDataById,
  updateDataById,
  deleteDataById,
};
