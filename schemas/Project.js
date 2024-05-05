/* Dependencies */
import mongoose from "mongoose";

/* Default-Export */
export default mongoose.model('Project', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
}));