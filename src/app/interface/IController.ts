export interface IRequest {
  body: Record<string, any>;
  params: Record<string, string>;
  accountId: string | undefined
}

export interface IResponse {
  status: number;
  body: Record<string, any>;
}

export interface IController {
  handle({ body, params }: IRequest): Promise<IResponse>;
}
