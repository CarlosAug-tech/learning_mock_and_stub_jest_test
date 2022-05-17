import { hash } from 'bcrypt';
import { IEncryptProvider } from '../contracts/encrypt-provider';

class BcryptProvider implements IEncryptProvider {
  async hash(password: string, salt: number): Promise<string> {
    const hashed = await hash(password, salt);
    return hashed;
  }
}

export { BcryptProvider };
