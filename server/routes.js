import express from "express";
import newController from "./controllers/newController";
import userController from "./controllers/userController";
const routes = express();

routes.get("/", newController.get);

routes.post("/signup", userController.post);

export default routes;
