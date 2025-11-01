import { CreateUserRepository } from "./app/repositories/CreateUserUseCaseRepository";
import { GetUserByEmailRepository } from "./app/repositories/GetUserByEmailRepository";
import { SignInUseCase } from "./app/useCases/SignInUseCase";
import { SignUpUseCase } from "./app/useCases/SignUpUseCase";

const userTest = {
  name: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword123",
};

try {
  const signInUseCase = new SignInUseCase();
  const { token, user } = signInUseCase.execute({
    email: userTest.email,
    password: userTest.password,
  });
  console.log("Sign In Successful:");
  console.log("User ID:", user.id);
  console.log("Token:", token);
} catch (err) {
  if (err instanceof Error) {
    console.error("Error during sign up:", err.message);
  } else {
    console.error("Error during sign in:", err);
  }
}
