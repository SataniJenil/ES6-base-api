import express from "express";
const router = express.Router();
import { todoControllers } from "../controllers";
import { auth } from "../middleware";
import { joi } from "../middleware";

router.get("/oneId", todoControllers.findUser);

router.post("/create", auth, todoControllers.addData);

router.put("/:id", todoControllers.updateData);

router.delete("/:id", todoControllers.deleteData);

export default router;
