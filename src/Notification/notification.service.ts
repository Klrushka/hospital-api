import * as schedule from 'node-schedule';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { DoctorService } from 'src/Doctor/doctor.service';
import { Doctor } from 'src/Doctor/schemas/doctor.schema';
import { Slot } from 'src/Slot/schemas/slot.schema';
import { User } from 'src/User/schemas/user.shema';
import { UserService } from 'src/User/user.service';
import { NotificationStrategy } from './interfaces/starategy.interface';
import { consoleStrategy } from './strategies/console.strategy';

@Injectable()
export class NotificationService {
  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
  ) {}

  async addNotification(slot: Slot) {
    const user = await this.userService.finById(slot.user);
    const doctor = await this.doctorService.finById(slot.doctor);
    console.log(this.getNotificationsDates(slot.date));
    this.getNotificationsDates(slot.date).forEach((date) => {
      schedule.scheduleJob(
        date,
        this.getSendNotificationFunction(
          this.getNotificationMessage(user, doctor, slot),
          consoleStrategy,
        ),
      );
    });
    console.log(schedule.scheduledJobs);
  }

  getNotificationMessage(user: User, doctor: Doctor, slot: Slot): string {
    return `${new Date().toLocaleString()} | Hello  ${
      user.name
    }! We remind you of the ${
      doctor.spec
    }'s appointment at ${slot.date.toLocaleString()}`;
  }

  getNotificationsDates(appointmentDate: Date): Date[] {
    const twoDaysBeforeAppoitmentDate = moment(appointmentDate)
      .subtract(2, 'days')
      .toDate();
    const twoHoursBeforeAppoitmentDate = moment(appointmentDate)
      .subtract(2, 'hours')
      .toDate();
    return [twoDaysBeforeAppoitmentDate, twoHoursBeforeAppoitmentDate];
  }

  getSendNotificationFunction(
    message: string,
    strategy: NotificationStrategy,
  ): () => void {
    return () => strategy(message);
  }
}
