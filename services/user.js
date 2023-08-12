import * as UserRepo from "../repository/users.js";
import { successResponse, errorResponse } from "../utils/response.js";
// import bcrypt
import bcrypt from "bcrypt";
// import JWT
import jwt from "jsonwebtoken";

const SECRET_AT = "kelas.com";
const SECRET_RT = "wahid-dwi-saputra";

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
    const saltRound = 10;
    const hashed = await bcrypt.hash(password, saltRound);
    const [result] = await UserRepo.createData(name, email, hashed);
    successResponse(response, "berhasil menambahkan data", result.insertId);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (request, response, next) => {
  try {
    let id = request.body.id;
    let name = request.body.name;
    let email = request.body.email;
    const [result] = await UserRepo.updateData(name, email, id);
    successResponse(response, "berhasil mengupdate data", result.info);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await UserRepo.deleteData(id);
    successResponse(response, "Ok", result[0]);
  } catch (error) {
    next(error);
  }
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

// function AUthorization
export const authUser = async (request, response, next) => {
  try {
    let email = request.body.email;
    let pass = request.body.password;
    const [result] = await UserRepo.getDataByEmail(email);
    const user = result[0];
    // console.log(user);

    if (result.length > 0) {
      bcrypt.compare(pass, user.password, (err, result) => {
        console.log(user.password);
        if (result) {
          let claims = {
            id: user.user_id,
            email: user.email,
            name: user.name,
            created_at: user.created_at,
          };
          const accessToken = jwt.sign(claims, SECRET_AT, { expiresIn: "15m" });
          const refreshToken = jwt.sign(claims, SECRET_RT, {
            expiresIn: "30m",
          });
          let userData = {
            id: user.user_id,
            email: user.email,
            name: user.name,
            created_at: user.created_at,
          };
          console.log(user);
          let responseData = {
            access_token: accessToken,
            refresh_token: refreshToken,
            user_data: userData,
          };
          successResponse(response, "Ok", responseData);
        } else {
          errorResponse(response, "email atau password salah!", 400);
        }
      });
    } else {
      errorResponse(response, "email atau password salah!", 400);
    }
  } catch (error) {
    next(error);
  }
};
