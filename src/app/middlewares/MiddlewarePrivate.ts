import { verifyJwt } from "../../jwt/verify";
import {
  IMiddleware,
  IRequest,
  IResponse,
  IData,
} from "../interface/IMiddleware";

export class MiddlewarePrivate implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
  
    const token = headers["authorization"];
    if (!token) {
      return {
        status: 401,
        body: {
          message: "Unauthorized",
        },
      };
    }
    const [_, bearerToken] = token.split(" ");
    const verify = verifyJwt(bearerToken);
    
    if (!verify || !verify.verifyJwt) {
        return {
            status: 401,
            body: {
                message: "Unauthorized",
            },
        };
    }

    return {
      status: 200,
      body: {
        message: "Authorized",
      },
    };
  }
}
