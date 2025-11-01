import { IController, IRequest, IResponse } from "../interface/IController";
import { z } from "zod";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";

const shema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export class CreateUserController implements IController {
  constructor(readonly userService: CreateUserUseCase) {}
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, email, password } = shema.parse(body);
      const { user } = await this.userService.execute({
        name,
        email,
        password,
      });

      return {
        status: 200,
        body: {
          message: user,
        },
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          status: 400,
          body: {
            message: "Validation error",
            issues: error.issues,
          },
        };
      }
      return {
        status: 500,
        body: {
          message: "Internal server error",
        },
      };
    }
  }
}
