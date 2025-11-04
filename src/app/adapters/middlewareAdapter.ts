import { Request, Response } from "express";
import { IMiddleware } from "../interface/IMiddleware";

export function routerMiddleware(middleware: IMiddleware) {
  return async (req: Request, res: Response, next: Function) => {
    const { status, body } = await middleware.handle({
      headers: req.headers as Record<string, string>,
    });
  
    if (status === 200) {
      next();
    } else {
      res.status(401).json(body);
    }
  };
}
