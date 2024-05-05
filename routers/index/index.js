/* Dependencies */
import express from "express";

/* Routes */
import GETHealthcheck from "./routes/GET-Healthcheck.js";

/* Constants */
const router = express.Router();

/* Router-Definition */
router.get('/healthcheck', GETHealthcheck);

/* Default-Export */
export default router;