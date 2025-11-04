import { SignInController } from "../controllers/SignInController";
import { SignInUseCase } from "../useCases/SignInUseCase";


export function makeSignIn() {
    const signInUseCase = new SignInUseCase();
    const controller = new SignInController(signInUseCase);
    return controller;
}