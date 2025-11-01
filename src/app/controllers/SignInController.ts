import { IController, IRequest, IResponse } from "../interface/IController";
import { z } from "zod";
import { SignInUseCase } from "../useCases/SignInUseCase";
import { InvalidCredentialsError } from "../err/Invalid-credentials-err";

const shema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class SignInController implements IController {
  constructor(readonly userService: SignInUseCase) {}
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = shema.parse(body);
      const { user, token } = await this.userService.execute({ email, password });

      return {
        status: 200,
        body: {
          message: {
            user: {
              id: user.id,
            },
            token,
          },
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
      if (error instanceof InvalidCredentialsError) {
        return {
          status: 401,
          body: {
            message: "Invalid credentials",
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
