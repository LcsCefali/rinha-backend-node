import winston from 'winston';
import { LOG_LEVEL } from '~/settings';

export const logger = winston.createLogger({
  level: LOG_LEVEL,
  transports: [
    new winston.transports.Console({
      handleExceptions: true
    })
  ]
});
