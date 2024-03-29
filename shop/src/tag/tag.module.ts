import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  controllers: [TagController],
  providers: [TagService, PrismaService],
})
export class TagModule {}
