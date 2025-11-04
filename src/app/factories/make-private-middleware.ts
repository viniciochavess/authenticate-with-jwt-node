import { MiddlewarePrivate } from "../middlewares/MiddlewarePrivate";

export function makePrivateMiddleware() {
  const middleware = new MiddlewarePrivate();
  return middleware;
}
