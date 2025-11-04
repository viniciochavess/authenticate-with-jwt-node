import { Router } from "express";
import { makeCreateUser } from "../../app/factories/make-create-use";

export const userRouter = Router();

userRouter.post("/user", (req, res) => {
  const userController = makeCreateUser();
  userController.handle(req).then((response) => {
    res.status(response.status).json(response.body);
  });
});
