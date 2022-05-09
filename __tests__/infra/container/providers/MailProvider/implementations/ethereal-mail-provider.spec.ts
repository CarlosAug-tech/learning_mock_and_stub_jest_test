import { EtherealMailProvider } from '@infra/container/providers/MailProvider/implementations/ethereal-mail-provider';

jest.mock('nodemailer');
const nodemailer = require('nodemailer');

const optionsMail = {
  host: 'any_host',
  port: 2525,
  auth: {
    user: 'any_user',
    pass: 'any_pass',
  },
};

const sendMailMock = jest.fn().mockReturnValueOnce({
  to: 'any_mail@email.com',
  subject: 'any_subject',
  from: 'user_test_mock@noreply.com',
});
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

interface ISutTypes {
  sut: EtherealMailProvider;
}

const makeSut = (): ISutTypes => {
  const sut = new EtherealMailProvider(optionsMail);

  return { sut };
};

describe('Ethereal Mail Provider', () => {
  it('should be able to send new E-mail', async () => {
    const { sut } = makeSut();
    const email = {
      to: 'any_mail@email.com',
      subject: '',
      variables: {
        name: 'any_name',
        email: 'any_email@mail.com',
      },
      path: 'any_path',
    };

    const newEmail = await sut.sendMail(
      email.to,
      email.subject,
      email.variables,
      email.path,
    );

    expect(newEmail).toEqual({
      to: 'any_mail@email.com',
      subject: 'any_subject',
      from: 'user_test_mock@noreply.com',
    });
  });
});
