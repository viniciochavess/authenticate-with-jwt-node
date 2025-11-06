import { Router } from "express";
import { makePrivateMiddleware } from "../../app/factories/make-private-middleware";
import { routerMiddleware } from "../../app/adapters/middlewareAdapter";
import { InvalidTokenJwtError } from "../../app/err/Invalid-token-jwt-err";
export const privateRouter = Router();

privateRouter.get(
  "/private",
  routerMiddleware(makePrivateMiddleware()),
  (req, res) => {
    try {
      console.log(req.metadata);
      res.status(200).json({ message: "This is a private route" });
    } catch (error) {
        if( error instanceof InvalidTokenJwtError){
         res.status(401).json({ message: error.message });
        
        }
       res.status(401).json({ message: "Unauthorized" });
    }
  }
);
