import { Module } from '@nestjs/common';
import { HouseModule } from './house/house.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, HouseModule],
})
export class AppModule {}
