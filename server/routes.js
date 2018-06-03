import express from "express";
import newController from "./controllers/newController";
import userController from "./controllers/userController";
import postController from "./controllers/postController";
const routes = express();

routes.get("/", newController.get);

routes.post("/signup", userController.post);
routes.post("/post", postController.post);
routes.get("/posts", postController.getAll);
export default routes;
