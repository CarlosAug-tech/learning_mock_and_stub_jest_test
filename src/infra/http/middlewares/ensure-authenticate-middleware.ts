import authConfig from '@infra/config/auth-config';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token is missing!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, authConfig.token_secret) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new Error('Token is invalid!');
  }
};
