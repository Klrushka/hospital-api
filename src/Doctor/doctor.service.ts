import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoctorDto } from 'src/dto/doctor/doctor.create.dto';
import { Doctor, DoctorDocument } from './schemas/doctor.schema';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.find().exec();
  }

  async finById(id: string): Promise<Doctor> {
    return await this.doctorModel.findById(id);
  }

  async createDoctor(createDoctoDto: CreateDoctorDto): Promise<Doctor> {
    const createdDoctor = new this.doctorModel(createDoctoDto);
    return createdDoctor.save();
  }
}
