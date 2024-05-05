/* Dependencies */
import express from "express";

/* Routes */
import GETHealthcheck from "./routes/GET-Healthcheck.js";
import GETVersion from "./routes/GET-Version.js";

/* Constants */
const router = express.Router();

/* Router-Definition */
router.get('/healthcheck', GETHealthcheck);
router.get('/version', GETVersion);

/* Default-Export */
export default router;