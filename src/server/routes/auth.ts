import { Router } from "express";
import { makeSignIn } from "../../app/factories/make-sign-in";
import { routerAdapter } from "../../app/adapters/routerAdapter";

export const authRouter = Router();

authRouter.post("/login", routerAdapter(makeSignIn()));
