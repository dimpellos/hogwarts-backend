import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

@Injectable()
export class HouseService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHouseDto) {
    return this.prisma.house.create({ data });
  }

  async findAll() {
    return this.prisma.house.findMany();
  }

  async searchByName(name: string) {
    if (!name.trim()) {
      return []; // or throw new BadRequestException('Name is required');
    }
  
    return this.prisma.house.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async findOne(id: number) {
    const house = await this.prisma.house.findUnique({ where: { id } });
    if (!house) throw new NotFoundException(`House with ID ${id} not found`);
    return house;
  }

  async update(id: number, data: UpdateHouseDto) {
    await this.findOne(id); // ensure it exists
  
    return this.prisma.house.update({
      where: { id },
      data, // only update fields explicitly provided
    });
  }

  async remove(id: number) {
    await this.findOne(id); // validate exists
    return this.prisma.house.delete({ where: { id } });
  }
}
