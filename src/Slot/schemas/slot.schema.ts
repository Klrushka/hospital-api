import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SlotDocument = HydratedDocument<Slot>;

@Schema()
export class Slot {
  _id: mongoose.Types.ObjectId;

  // @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' } })
  @Prop()
  doctor: string;

  // @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  @Prop({ default: null })
  user: string;

  @Prop({ unique: true })
  date: Date;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);
