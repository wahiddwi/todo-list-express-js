import * as TaskRepo from "../repository/tasks.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const getAllTask = async (request, response, next) => {
  try {
    const [result] = await TaskRepo.getData();
    successResponse(response, "Ok", result);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (request, response, next) => {
  try {
    let user_id = request.body.user_id;
    let task_name = request.body.task_name;
    let isCompleted = request.body.is_completed;
    const [result] = await TaskRepo.createData(user_id, task_name, isCompleted);
    if (result.affectedRows > 0) {
      successResponse(response, "berhasil menambah data", result.affectedRows);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await TaskRepo.getDataById(id);
    console.log(result);
    if (result.length > 0) {
      successResponse(response, "Ok", result[0]);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (request, response, next) => {
  try {
    let id = request.params.id;
    let user_id = request.body.user_id;
    let task_name = request.body.task_name;
    let isCompleted = request.body.is_completed;
    const [result] = await TaskRepo.updateData(
      user_id,
      task_name,
      isCompleted,
      id
    );
    if (result.affectedRows > 0) {
      successResponse(response, "berhasil mengubah data", result.affectedRows);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await TaskRepo.deleteData(id);
    if (result.affectedRows > 0) {
      successResponse(response, "berhasil menghapus data", result.affectedRows);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};
