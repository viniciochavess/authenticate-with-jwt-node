import { SignUpUseCase } from "./app/useCases/SignUpUseCase";

const user  = {
  name: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword123"
}

const signUp = new SignUpUseCase();

console.log("Sign up successful:", signUp.execute(user)); 

