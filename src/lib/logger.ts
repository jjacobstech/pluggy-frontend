import { APP_ENV } from '@/config/config';

const isDev = APP_ENV === 'development';

type LogLevel = 'error' | 'warn' | 'log';

export const log = <T>(data: T, logType: LogLevel = 'log') => {
  if (!isDev) return;

  const logFn = console[logType] ?? console.log;

  logFn(data);
};
