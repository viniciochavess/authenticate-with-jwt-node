import { Request, Response } from "express";
import { IMiddleware } from "../interface/IMiddleware";

export function routerMiddleware(middleware: IMiddleware) {
  return async (req: Request, res: Response, next: Function) => {
    const result = await middleware.handle({
      headers: req.headers as Record<string, string>,
    });

    if ("status" in result && "body" in result) {
      const { status, body } = result;

      return res.status(status).json(body);
    }
    if ("data" in result) {
      req.metadata = { ...req.metadata, ...result.data };
      return next();
    }
  };
}
