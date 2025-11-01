import { Router } from "express";
import { SignInController } from "../../app/controllers/SignInController";
import { SignInUseCase } from "../../app/useCases/SignInUseCase";

const authRouter = Router();
const signInUseCase = new SignInUseCase();
const signInController = new SignInController(signInUseCase);

authRouter.post("/login", (req, res) => {
  signInController.handle({ body: req.body }).then((response) => {
    res.status(response.status).json(response);
  });
});

export { authRouter };
