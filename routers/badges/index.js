/* Dependencies */
import express from "express";

/* Routes */
import GETHealthcheck from "./routes/GET-Healthcheck.js";
import GETVersion from "./routes/GET-Version.js";
import GETVersionDynamic from "./routes/GET-VersionDynamic.js";

/* Constants */
const router = express.Router();

/* Router-Definition */
router.get('/healthcheck', GETHealthcheck);
router.get('/version', GETVersion);
router.get('/version/dynamic', GETVersionDynamic);

/* Default-Export */
export default router;