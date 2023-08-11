/*
  1. Tambahkan endpoint users untuk menghapus dan melakukan update
      - endpoint delete harus menggunakan method delete
      - endpoint update harus menggunakan method put
  2. Buat database tasks dengan kolom sebagai berikut : task_id, 
    user_id, task_name, is_completed, created_at, updated_at
  3. Buat endpoint CRUD lengkap untuk table task
*/
// import express js
import express from "express";
// import service
import * as UserService from "./services/user.js";
import * as TaskService from "./services/task.js";

// menggunakan express js
const app = express();
const port = 8080;
const host = "localhost";

// menggunakan middleware
app.use(express.json());

// membuat routing
app.get("/users", UserService.getAllUser);
app.get("/users/:id", UserService.getDataById);
app.post("/users", UserService.createUser);
app.put("/users/:id", UserService.updateUser);
app.delete("/users/:id", UserService.deleteUser);

app.get("/tasks", TaskService.getAllTask);
app.get("/tasks/:id", TaskService.getTaskById);
app.post("/tasks", TaskService.createTask);
app.put("/tasks/:id", TaskService.updateTask);
app.delete("/tasks/:id", TaskService.deleteTask);

// untuk mwnjalankan server
app.listen(port, host, () => {
  console.log(`Server REST API berjalan di http://${host}:${port}`);
});
