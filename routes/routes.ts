import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser
} from "../services/user.service.ts";
const router = new Router({
  prefix: '/api/v1'
});

router.get("/users", getAllUsers)
  .get("/user/:id", getUser)
  .post("/user", addUser)
  .put("/user/:id", updateUser)
  .delete("/user/:id", deleteUser);
export default router;
