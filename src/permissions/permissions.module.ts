import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpacePermission } from './space-permission.entity';
import { DeckPermission } from './deck-permission.entity';
import { CardPermission } from './card-permission.entity';
import { Space } from 'src/space/space.entity';
import { Deck } from 'src/decks/deck.entity';
import { Card } from 'src/card/card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpacePermission, DeckPermission, CardPermission, Space, Deck, Card]),

  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
