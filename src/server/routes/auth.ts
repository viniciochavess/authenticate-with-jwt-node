import { Router } from "express";
import { SignInController } from "../../app/controllers/SignInController";
import { SignInUseCase } from "../../app/useCases/SignInUseCase";

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
  const signInUseCase = new SignInUseCase();
  const signInController = new SignInController(signInUseCase);
  signInController.handle({ body: req.body }).then((response) => {
    res.status(response.status).json(response);
  });
});
