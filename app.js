/* Dependencies */
import dotenv from "dotenv";

/* Environment-Variables */
dotenv.config();

/* Utils */
import utilMongoDB from "./utils/mongodb.js";
import utilServer from "./utils/server.js"

/* Connections */
utilMongoDB.init();
utilServer.init();