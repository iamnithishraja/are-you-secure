import express from "express";
import {
  pushUser,
  checkBreach,
  getBreachAnalysis,
} from "../controllers/userController.js";

const userRoutes = express.Router();
userRoutes.post("/pushUser", pushUser);
userRoutes.get("/checkBreach/:email", checkBreach);
userRoutes.get("/getBreachAnalysis/:email", getBreachAnalysis);

export default userRoutes;
