import { CreateUserController } from "../controllers/CreateUserController";
import { CreateUserRepository } from "../repositories/CreateUserRepository";
import { GetUserByEmailRepository } from "../repositories/GetUserByEmailRepository";
import { SignUpUseCase } from "../useCases/SignUpUseCase";

export function makeCreateUser() {
  const createUserRepository = new CreateUserRepository();
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const signUpUseCase = new SignUpUseCase(
    getUserByEmailRepository,
    createUserRepository
  );
  const createUserController = new CreateUserController(signUpUseCase);
  return createUserController;
}
