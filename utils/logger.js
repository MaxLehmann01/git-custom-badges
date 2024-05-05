/* Dependencies */
import winston from "winston";
import 'winston-daily-rotate-file';
import path from "path";

/* Non-Exports */
const consoleFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  winston.format.colorize({ all: true }),
  winston.format.errors({ stack: true })
)

const fileFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  winston.format.errors({ stack: true })
);

const transports = [
  new winston.transports.Console({
    format: consoleFormat
  }),
  new winston.transports.DailyRotateFile({
    filename: path.join('logs/info', 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info',
    format: fileFormat
  }),
  new winston.transports.DailyRotateFile({
    filename: path.join('logs/error', 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error',
    format: fileFormat
  })
]

/* Default-Export */
export default winston.createLogger({ transports });