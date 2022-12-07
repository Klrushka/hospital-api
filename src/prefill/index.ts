/* eslint-disable @typescript-eslint/no-empty-function */
import 'dotenv/config';
import mongoose from 'mongoose';
import { users } from './data/user';
import { Doctor } from './schemas/doctor.chema';
import { User } from './schemas/user.schema';
import { Slot } from './schemas/slot.schema';
import { doctors } from './data/doctor';

mongoose
  .connect(process.env.DATABASE_URL_CONNECTION)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

const dropAllCollections = async () => {
  await mongoose.connection.dropDatabase();
};

const fillAllCollections = async () => {
  await User.insertMany(users);
  await Doctor.insertMany(doctors);
  const doctorsIds = await Doctor.find().select('_id');
  for (const { _id } of doctorsIds) {
    // TODO спросить
    await Slot.create({
      doctor: _id,
      user: null,
      date: new Date(),
    });
  }
};

async function prefill() {
  await dropAllCollections();
  await fillAllCollections();
  console.log('DONE');
  process.exit(0);
}

prefill();
