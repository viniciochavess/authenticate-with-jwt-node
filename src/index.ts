import { createUserUseCase } from "./app/useCases/create-user-useCase";

const newUser = createUserUseCase({
  name: "John Doe",
  email: "john.doe@example.com",
  password: "securepassword123",
});
console.log("New user created:", newUser);
