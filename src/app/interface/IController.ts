export interface IRequest {
  body: Record<string, any>;
}

export interface IResponse {
  status: number;
  body: Record<string, any>;
}

export interface IController {
  handle({ body }: IRequest): Promise<IResponse>;
}
