import { CreateUserRepository } from "../repositories/CreateUserRepository";
import { GetUserByEmailRepository } from "../repositories/GetUserByEmailRepository";
import { SignInUseCase } from "../useCases/SignInUseCase";


export function makeSignIn() {
    const signInUseCase = new SignInUseCase();
    return signInUseCase;
}