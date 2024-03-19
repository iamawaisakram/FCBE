import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpacePermission } from './space-permission.entity';
import { DeckPermission } from './deck-permission.entity';
import { CardPermission } from './card-permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpacePermission, DeckPermission, CardPermission]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
