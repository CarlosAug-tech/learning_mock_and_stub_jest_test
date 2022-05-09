interface IMailProviderResponse {
  to: string;
  subject: string;
  from: string;
}

interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<IMailProviderResponse>;
}

export { IMailProvider, IMailProviderResponse };
