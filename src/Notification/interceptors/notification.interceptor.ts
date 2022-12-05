import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { NotificationService } from '../notification.service';

@Injectable()
export class SetNotificationInterceptor implements NestInterceptor {
  constructor(private notificationService: NotificationService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const slot = next.handle().pipe(map((data) => ({ data })));
    slot.subscribe((slot) => {
      this.notificationService.addNotification(slot.data);
    });
    return slot;
  }
}
