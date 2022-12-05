import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorModule } from 'src/Doctor/doctor.module';
import { NotificationModule } from 'src/Notification/notification.module';
import { Slot, SlotSchema } from './schemas/slot.schema';
import { SlotController } from './slot.controller';
import { SlotService } from './slot.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Slot.name, schema: SlotSchema }]),
    DoctorModule,
    NotificationModule,
  ],
  controllers: [SlotController],
  providers: [SlotService],
})
export class SlotModule {}
