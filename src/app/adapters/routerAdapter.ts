import { Request, Response } from "express";
import { IController } from "../interface/IController";

export function routerAdapter(controller: IController) {
  return async (req: Request, res: Response) => {
    const { status, body } = await controller.handle({ body: req.body , params: req.params });
    res.status(status).json(body);
  };
}
