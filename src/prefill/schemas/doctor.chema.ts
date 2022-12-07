import mongoose, { Schema } from 'mongoose';

export const DoctorSchema = new Schema({
  name: String,
  spec: String,
});

export const Doctor = mongoose.model('Doctor', DoctorSchema);
