import { compare, hash } from 'bcrypt';
import { IEncryptProvider } from '../contracts/encrypt-provider';

class BcryptProvider implements IEncryptProvider {
  async hash(password: string, salt: number): Promise<string> {
    const hashed = await hash(password, salt);
    return hashed;
  }

  async compare(password: string, password_hash: string): Promise<boolean> {
    const isMatch = await compare(password, password_hash);
    return isMatch;
  }
}

export { BcryptProvider };
