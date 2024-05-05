/* Dependencies */
import express from "express";

/* Middleware */
import projectPushTokenMiddleware from "../../middleware/ProjectPushTokenMiddleware.js";

/* Routes */
import POST from "./routes/POST.js";

/* Constants */
const router = express.Router();

/* Router-Definition */
router.post('/', projectPushTokenMiddleware, POST);

/* Default-Export */
export default router;