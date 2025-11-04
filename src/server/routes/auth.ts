import { Router } from "express";
import { SignInController } from "../../app/controllers/SignInController";
import { SignInUseCase } from "../../app/useCases/SignInUseCase";
import { makeSignIn } from "../../app/factories/make-sign-in";

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
 const signInUseCase = makeSignIn();
 const { user, token } = signInUseCase.execute(req.body);
 res.status(200).json({ user, token });
});
