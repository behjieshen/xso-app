import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  name: String,
  image: String,
  role: { type: String, enum: ["STUDENT", "NEW USER", "ADMIN", "APPLICANT"], default: "NEW USER" },
  createdOn: { type: Date, default: Date.now }
});

export default mongoose.models["User"] ||
  mongoose.model("User", userSchema, "users");
