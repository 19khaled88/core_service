import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { RoomService } from './services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';



const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room created successfully',
    data: result,
  });
});

const getDataById = catchAsync(async(req:Request,res:Response)=>{
    const result = await RoomService.getDataById(req.params.id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Room for given ID',
        data:result
    })
})

const getData = catchAsync(async(req:Request,res:Response)=>{
    const result = await RoomService.getRoom()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Found rooms',
        data:result
    })
})

const updateDataById =catchAsync(async(req:Request,res:Response)=>{
    const result = await RoomService.updateDataById(req.params.id, req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Room updated successfully',
        data:result
    })
})

const deletedDataById=catchAsync(async(req:Request,res:Response)=>{
    const result = await RoomService.deleteDataById(req.params.id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Room deleted successfully',
        data:result
    })
})

export const RoomController = {
    insertIntoDB,
    getDataById,
    getData,
    updateDataById,
    deletedDataById
}
