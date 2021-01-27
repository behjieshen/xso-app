import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  name: String,
  image: String,
});

export const User = mongoose.model('User', userSchema);
