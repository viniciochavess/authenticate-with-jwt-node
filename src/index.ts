import { createUserUseCase } from "./app/useCases/create-user-useCase";
import { signUp } from "./app/useCases/sign-up";

const user  = {
  name: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword123"
}

const sign = signUp({
  email: user.email,
  password: user.password
})
console.log("Sign up successful:", sign); 

