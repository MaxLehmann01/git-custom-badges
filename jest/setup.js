/* Dependencies */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

/* Environment-Variables */
dotenv.config({ path: "./.env.test" });

/* Utils */
import utilServer from "../utils/server.js";

/* Schemas */
import Project from "../schemas/Project.js";

/* Default-Export */
export default async () => {
  const mongoServer = await MongoMemoryServer.create({
    binary: {
      version: '4.4.6'
    }
  });

  await mongoose.connect(mongoServer.getUri(), { 
    dbName: "gcb" 
  });

  /* Starting Server */
  utilServer.init();

  /* Creating MongoDB Demo Objects */
  const project = new Project({ name: 'jest-demo-project', version: '1.0.0', timestamp: new Date() })
  await project.save();

  global.__SERVER__ = utilServer.server;
  global.__MONGOOSE__ = mongoose;
  global.__MONGO_SERVER__ = mongoServer;
  global.__MONGO_DEMO_OBJECTS = {
    project
  }
}