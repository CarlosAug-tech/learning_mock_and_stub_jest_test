import nodemailer, { Transporter } from 'nodemailer';
import authMail from '@infra/config/email-config';
import {
  IMailProvider,
  IMailProviderResponse,
} from '../contracts/mail-provider';

interface IMailProviderRequest {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
}

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(options?: IMailProviderRequest) {
    const transporter = nodemailer.createTransport({
      host: options ? options.host : authMail.host,
      port: options ? options.port : authMail.port,
      auth: {
        user: options ? options.auth.user : authMail.auth.user,
        pass: options ? options.auth.pass : authMail.auth.pass,
      },
    });

    this.client = transporter;
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<IMailProviderResponse> {
    const message = this.client.sendMail({
      to,
      subject,
      from: 'user_test_mock@noreply.com',
    });

    return message;
  }
}

export { EtherealMailProvider };
