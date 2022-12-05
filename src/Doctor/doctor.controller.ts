import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDoctorDto } from 'src/dto/doctor/doctor.create.dto';
import { DoctorService } from './doctor.service';
import { Doctor } from './schemas/doctor.schema';

@Controller()
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Get('/doctor')
  async getAll(): Promise<Doctor[]> {
    const data = await this.doctorService.findAll();
    return data;
  }

  @Post('/doctor')
  async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return await this.doctorService.createDoctor(createDoctorDto);
  }
}
