import { PrismaClient, Room } from '@prisma/client';

const prisma = new PrismaClient();

const insertIntoDB = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data: data,
  });
  return result;
};

const getRoom = async (): Promise<Room[] | null> => {
  const result = await prisma.room.findMany();
  return result;
};

const getDataById = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateDataById = async (id: string, payload: Partial<Room>) => {
  const isExist = await prisma.room.findFirstOrThrow({
    where: {
      id: id,
    },
  });
  if (isExist && isExist.id === id) {
    const isUpdated = await prisma.room.update({
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

const deleteDataById = async (id: string): Promise<Room> => {
  const isExist = await prisma.room.findFirstOrThrow({
    where: {
      id: id,
    },
  });
  if (isExist && isExist.id === id) {
    const isDeleted = await prisma.room.delete({
      where: {
        id: id,
      },
    });
    return isDeleted;
  } else {
    return isExist;
  }
};
export const RoomService = {
  insertIntoDB,
  getRoom,
  getDataById,
  updateDataById,
  deleteDataById,
};
