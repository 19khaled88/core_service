import { Course, PrismaClient } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ICourseCreateData } from './interface';
const prisma = new PrismaClient();

const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: courseData,
    });

    if(!result){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Course not created')
    }
    if (preRequisiteCourses && Object.keys(preRequisiteCourses).length > 0) {
      for (
        let index = 0;
        index < Object.keys(preRequisiteCourses).length;
        index++
      ) {
        const createPrerequisite =
          await transactionClient.courseToPrerequisite.create({
            data: {
              courseId: result.id,
              preRequisiteId: preRequisiteCourses[index].courseId,
            },
          });
      }
    }

    return result
  });

  if(newCourse){
    const responseData = await prisma.course.findUnique({
        where:{
            id:newCourse.id
        },
        include:{
            preRequisite:{
                include:{
                    preRequisite:true 
                }
            },
            preRequisiteFor:{
                include:{
                    course:true
                }
            }
        }
    })
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Course not created')
};

const getData = async (): Promise<Course[] | null> => {
  const result = await prisma.course.findMany({
    include: {
      preRequisite: true,
      preRequisiteFor: true,
    },
  });
  return result;
};

const getDataById = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findFirstOrThrow({
    where: {
      id: id,
    },
  });
  return result;
};

const updateById = async (
  id: string,
  payload: Partial<Course>
): Promise<Course> => {
  const isExist = await prisma.course.findFirstOrThrow({
    where: {
      id: id,
    },
  });
  if (isExist && isExist.id === id) {
    const result = await prisma.course.update({
      where: {
        id: id,
      },
      data: payload,
    });
    return result;
  } else {
    return isExist;
  }
};

const deleteById = async (id: string): Promise<Course> => {
  const isExist = await prisma.course.findFirstOrThrow({
    where: {
      id: id,
    },
  });
  if (isExist && isExist.id === id) {
    const result = await prisma.course.delete({
      where: {
        id: id,
      },
    });
    return result;
  } else {
    return isExist;
  }
};

export const CourseService = {
  insertIntoDB,
  getData,
  updateById,
  getDataById,
  deleteById,
};
