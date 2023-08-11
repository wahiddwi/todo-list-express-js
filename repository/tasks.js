import dbPool from "../utils/db.js";

export const getData = () => {
  const sql =
    "SELECT task_id,user_id, task_name, is_completed, created_at FROM tasks";
  const result = dbPool.query(sql);

  return result;
};

export const getDataById = (id) => {
  const sql =
    "SELECT task_id,user_id, task_name, is_completed, created_at FROM tasks WHERE task_id = ?";
  const result = dbPool.query(sql, [id]);

  return result;
};

export const createData = (user_id, task_name, is_completed) => {
  let createdAt = new Date();
  const sql =
    "INSERT INTO tasks (user_id, task_name, is_completed, created_at) VALUE(?, ?, ?,?)";
  const value = [user_id, task_name, is_completed, createdAt];

  return dbPool.query(sql, value);
};

export const updateData = (user_id, task_name, is_completed, id) => {
  let updatedAt = new Date();
  const sql =
    "UPDATE tasks SET user_id = ?, task_name = ?, is_completed=?, updated_at = ? WHERE task_id = ?";
  const value = [user_id, task_name, is_completed, updatedAt, id];

  return dbPool.query(sql, value);
};

export const deleteData = (id) => {
  const sql = "DELETE FROM tasks WHERE task_id = ?";
  const value = [id];

  return dbPool.query(sql, value);
};
