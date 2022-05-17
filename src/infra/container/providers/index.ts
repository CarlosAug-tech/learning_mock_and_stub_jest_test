import { container } from 'tsyringe';
import { IEncryptProvider } from './EncryptProvider/contracts/encrypt-provider';
import { BcryptProvider } from './EncryptProvider/implementations/bcrypt-provider';
import { IMailProvider } from './MailProvider/contracts/mail-provider';
import { EtherealMailProvider } from './MailProvider/implementations/ethereal-mail-provider';

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
);

container.registerSingleton<IEncryptProvider>('BcryptProvider', BcryptProvider);
