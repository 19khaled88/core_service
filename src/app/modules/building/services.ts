import { Building,PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const insertIntoDB = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data: data,
  });
  return result;
};

const getAllData = async (): Promise<Building[] | null> => {
  const result = await prisma.building.findMany({
    include: {
      rooms: true,
    },
  });
  return result;
};

const getDataById = async (id: string) => {
  const result = await prisma.building.findUnique({
    where: {
      id: id,
    },
  });
  return result === null ? 'No data found for this ID' : result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Building>
): Promise<Building | null> => {
  const isExist = await prisma.building.findFirstOrThrow({
    where: {
      id: id,
    },
  });
  if (isExist && isExist.id === id) {
    const isUpdated = await prisma.building.update({
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

const deletedDataById = async (id: string):Promise<Building> => {
  const isExist = await prisma.building.findFirstOrThrow({
    where: {
      id: id,
    },
  });
  if (isExist && isExist.id === id) {
    const isDeleted = await prisma.building.delete({
      where: {
        id: id,
      },
      include: {
        rooms: true,
      },
    });
    return isDeleted;
  } else {
    return isExist;
  }
};

export const BuildingService = {
  insertIntoDB,
  getAllData,
  getDataById,
  updateDataById,
  deletedDataById,
};
