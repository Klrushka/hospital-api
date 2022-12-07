import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  fcm: [String],
});

export const User = mongoose.model('User', UserSchema);
