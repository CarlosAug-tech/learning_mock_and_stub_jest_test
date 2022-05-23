import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  subject: {
    id: string;
  };
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
    const {
      subject: { id },
    } = verify(token, '') as IPayload;

    request.user = {
      id,
    };

    next();
  } catch (err) {
    throw new Error('Token is invalid!');
  }
};
