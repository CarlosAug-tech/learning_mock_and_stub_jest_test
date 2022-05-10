import { container } from 'tsyringe';
import { IMailProvider } from './MailProvider/contracts/mail-provider';
import { EtherealMailProvider } from './MailProvider/implementations/ethereal-mail-provider';

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
);
