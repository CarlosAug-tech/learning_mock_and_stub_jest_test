import crypto from 'crypto';
import { IUser } from '@domain/entities/user';

class User implements IUser {
  id: string;

  name: string;

  email: string;

  password: string;

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = crypto.randomUUID();
    }
  }
}

export { User };
