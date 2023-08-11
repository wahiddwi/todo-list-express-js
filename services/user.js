import { response } from "express";
import * as UserRepo from "../repository/users.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const getAllUser = async (request, response, next) => {
  try {
    const [result] = await UserRepo.getData();
    successResponse(response, "Ok", result);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (request, response, next) => {
  try {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    const [result] = await UserRepo.createData(name, email, password);
    successResponse(response, "berhasil menambahkan data", result.insertId);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (request, response, next) => {
  try {
    let id = request.params.id;
    let name = request.body.name;
    let email = request.body.email;
    // let password = request.body.password;
    const [result] = await UserRepo.updateData(name, email, id);
    if (result.affectedRows > 0) {
      successResponse(response, "berhasil mengubah data", result.affectedRows);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const [result] = await UserRepo.deleteData(req.params.id);
  successResponse(res, "berhasil menghapus data", result[0]);
};

export const getDataById = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await UserRepo.getDataById(id);
    if (result.length > 0) {
      successResponse(response, "OK", result[0]);
    } else {
      errorResponse(response, "Data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};
