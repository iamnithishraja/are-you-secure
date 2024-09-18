import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", userRoutes);

export default app;
