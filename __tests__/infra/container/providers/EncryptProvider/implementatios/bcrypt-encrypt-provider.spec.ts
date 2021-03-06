import { BcryptProvider } from '@infra/container/providers/EncryptProvider/implementations/bcrypt-provider';
// import { compare } from 'bcrypt';

jest.mock('bcrypt');
const bcrypt = require('bcrypt');

const hashSalt = 12;

bcrypt.compare.mockReturnValue(true);

interface ISutTypes {
  sut: BcryptProvider;
}

const makeSut = (): ISutTypes => {
  const sut = new BcryptProvider();

  return { sut };
};

describe('Bcrypt Provider', () => {
  it('should be able to compare encrypt passwords', async () => {
    const { sut } = makeSut();

    const passwordHash = await bcrypt.hash('any_password', hashSalt);

    const isPasswordMatch = await sut.compare('any_password', passwordHash);

    expect(isPasswordMatch).toBe(true);
  });

  it('should be able to encrypt password', async () => {
    const { sut } = makeSut();

    const passwordHash = await sut.hash('any_password', hashSalt);

    const isMatch = await bcrypt.compare('any_password', passwordHash);

    expect(isMatch).toBe(true);
  });
});
