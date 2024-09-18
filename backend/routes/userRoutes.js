import express from "express";
import {
  pushUser,
  checkBreach,
  getBreachAnalysis,
  checkPassword,
} from "../controllers/userController.js";

const userRoutes = express.Router();
userRoutes.post("/pushUser", pushUser);
userRoutes.get("/checkBreach/:email", checkBreach);
userRoutes.get("/getBreachAnalysis/:email", getBreachAnalysis);
userRoutes.get('/checkPassword',checkPassword);

export default userRoutes;
