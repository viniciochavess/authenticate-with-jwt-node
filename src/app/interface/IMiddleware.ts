
export interface IRequest {
    headers: Record<string, string | undefined>;
}

export interface IResponse {
  status: number;
  body: Record<string, any>;
}

export interface IData {
    data: Record<string, any>;
}

export interface IMiddleware {
  handle({ headers }: IRequest): Promise<IResponse | IData>;
}
