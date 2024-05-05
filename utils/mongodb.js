/* Dependencies */
import mongoose from "mongoose";

/* Utils */
import logger from './logger.js';

/* Non-Exports */
var connection;

/* Direct-Exports */
export const init = () => {
  if(process.env.MONGO_TLS !== "true" && process.env.MONGO_TLS !== "false") {
    logger.error('Invalid value for MONGO_TLS environment variable. Please set it to either "true" or "false".', 'error');
    process.exit(1);
  }

  mongoose.connect(process.env.MONGO_URI, {
    tls: process.env.MONGO_TLS === "true",
    tlsCAFile: process.env.MONGO_TLS_CA_FILE
  });

  connection = mongoose.connection
  connection.on('error', (err) => logger.debug(err, 'error'));
  connection.once('open', () => logger.info(`Successfully connected to MongoDB at ${process.env.MONGO_URI}`, 'success'));
}

/* Default-Export */
export default { init }