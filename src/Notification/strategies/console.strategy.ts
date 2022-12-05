import { NotificationStrategy } from '../interfaces/starategy.interface';

export const consoleStrategy: NotificationStrategy = (message: string): void =>
  console.log(message);
