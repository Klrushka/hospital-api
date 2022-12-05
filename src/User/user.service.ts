import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/user/user.create.dto';
import { User } from './schemas/user.shema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async finById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }
}
