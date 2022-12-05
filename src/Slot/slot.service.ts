import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LinkUserToSlotDto } from 'src/dto/slot/link.user.to.slot.dto';
import { CreateSlotDto } from 'src/dto/slot/slot.create.dto';
import { Slot, SlotDocument } from './schemas/slot.schema';

@Injectable()
export class SlotService {
  constructor(@InjectModel(Slot.name) private slotModel: Model<SlotDocument>) {}

  async create(slots: CreateSlotDto[]): Promise<Slot[]> {
    const createdSlots = await this.slotModel.insertMany(slots);
    return createdSlots;
  }

  async linkUserToSlot(info: LinkUserToSlotDto): Promise<Slot> {
    const { slot, user } = info;
    const findedSlot = await this.slotModel.findOne({ _id: slot });
    if (!findedSlot.user) {
      return await this.slotModel.findOneAndUpdate(
        { _id: new Types.ObjectId(slot) },
        { user },
        { new: true },
      );
    } else {
      throw new HttpException('slot is occupied', HttpStatus.CONFLICT);
    }
  }
}
