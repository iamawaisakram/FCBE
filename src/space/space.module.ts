// src/space/space.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';
import { Space } from './space.entity';
import { UserSpace } from './user-space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Space, UserSpace])],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpaceModule {}
