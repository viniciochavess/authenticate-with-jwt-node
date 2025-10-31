import { SignUpUseCase } from "./app/useCases/SignUpUseCase";

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword123",
};

try {
  const signIn = new SignUpUseCase();
  signIn.execute(user);
  console.log("User signed in successfully.");
} catch (err) {
  if (err instanceof Error) {
    console.error("Error during sign in:", err.message);
  } else {
    console.error("Error during sign in:", err);
  }
}
