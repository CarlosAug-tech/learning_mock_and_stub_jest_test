import { Request, Response } from 'express';

interface IHttpRequest {
  request: Request;
  response: Response;
}

abstract class Controller {
  abstract perform(httpRequest: IHttpRequest): Promise<any>;

  async handle(request: Request, response: Response): Promise<any> {
    return await this.perform({ request, response });
  }
}

export { Controller, IHttpRequest };
