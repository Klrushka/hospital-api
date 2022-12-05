import { Body, Controller, Patch, Post, UseInterceptors } from '@nestjs/common';
import { LinkUserToSlotDto } from 'src/dto/slot/link.user.to.slot.dto';
import { CreateSlotDto } from 'src/dto/slot/slot.create.dto';
import { SetNotificationInterceptor } from 'src/Notification/interceptors/notification.interceptor';
import { Slot } from './schemas/slot.schema';
import { SlotService } from './slot.service';

@Controller()
export class SlotController {
  constructor(private slotService: SlotService) {}

  @Post('/slot')
  async createSlots(@Body() slots: CreateSlotDto[]): Promise<Slot[]> {
    return await this.slotService.create(slots);
  }

  @Patch('/slot')
  @UseInterceptors(SetNotificationInterceptor)
  async linkUser(@Body() info: LinkUserToSlotDto): Promise<Slot> {
    return await this.slotService.linkUserToSlot(info);
  }
}
