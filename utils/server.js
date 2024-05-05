/* Dependencies */
import express from "express";
import http from "http";
import cors from "cors";

/* Utils */
import utilLib from "./lib.js";
import utilLogger from "./logger.js";

/* Routers */
import routerIndex from "../routers/index/index.js";
import routerBadges from "../routers/badges/index.js";

/* Non-Exports */
const app = express();
const router = express.Router();
const useMiddleware = () => {
  app.use(express.json());
  app.use(cors(utilLib.getCorsOpts()));
  app.use(router);
}

const useRouters = () => {
  router.use('/', routerIndex);
  router.use('/badges', routerBadges);
}

const useErrorHandlers = () => {
  app.use(utilLib.routeNotFound);

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => { 
    res.status(err.status || 500).json({ err: err.message });
  })
}

/* Direct-Exports */
export const init = () => {
  useMiddleware();
  useRouters();
  useErrorHandlers();
  server.listen(process.env.PORT, () => utilLogger.info(`Successfully started Server on Port ${process.env.PORT}`, 'success'));
}

export const server = http.createServer(app);

/* Default-Export */
export default {
  init,
  server
}