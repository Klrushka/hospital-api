import mongoose, { Schema } from 'mongoose';

export const SlotSchema = new Schema({
  doctor: String,
  user: String,
  date: Date,
});

export const Slot = mongoose.model('Slot', SlotSchema);
