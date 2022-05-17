import express from "express";
const router = express.Router();
import { userControllers } from "../controllers";
import { upload, auth } from "../middleware";
import { joi } from "../middleware";

router.get("/:id", auth, userControllers.findData);

router.get("/combineData", auth, userControllers.twoData);

router.post("/addUser", joi.registrationSchema, userControllers.registerApi);

router.post("/Login", userControllers.loginApi);

router.post("/upload", upload, auth, userControllers.csvController);

router.post("/image", auth, userControllers.imageUpload);

router.post("/aws", upload, userControllers.awsBase);

router.post("/combine", auth, joi.combineSchema, userControllers.combineData);

router.put(
  "/:id",
  auth,
  joi.updateRegistrationSchema,
  userControllers.updateData
);

router.delete("/delete", auth, userControllers.deleteData);

export default router;
