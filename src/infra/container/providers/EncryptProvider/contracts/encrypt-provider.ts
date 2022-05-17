interface IEncryptProvider {
  hash(password: string, salt: number): Promise<string>;
}

export { IEncryptProvider };
