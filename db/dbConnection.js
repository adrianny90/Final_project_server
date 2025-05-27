import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

export const AutoIncrementPlugin = AutoIncrement(mongoose);

try {
  const client = await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
  process.exit(1);
}
