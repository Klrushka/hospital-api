import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema()
export class Doctor {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  spec: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
