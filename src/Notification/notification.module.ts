import { Module } from '@nestjs/common';
import { DoctorModule } from 'src/Doctor/doctor.module';
import { UserModule } from 'src/User/user.module';
import { SetNotificationInterceptor } from './interceptors/notification.interceptor';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [DoctorModule, UserModule],
  controllers: [NotificationController],
  providers: [NotificationService, SetNotificationInterceptor],
  exports: [NotificationService],
})
export class NotificationModule {}
