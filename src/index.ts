import { GetUserByEmailUseCase } from "./app/useCases/GetUserByEmail";
import { SignUpUseCase } from "./app/useCases/SignUpUseCase";

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword123",
};

try {
  const userService = new GetUserByEmailUseCase();
  const signIn = new SignUpUseCase(userService);
  signIn.execute(user);
  console.log("User signed in successfully.");
} catch (err) {
  if (err instanceof Error) {
    console.error("Error during sign in:", err.message);
  } else {
    console.error("Error during sign in:", err);
  }
}
