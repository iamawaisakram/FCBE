import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { UserSpaceDeckCard } from './user-space-deck-card.entity';
import { Deck } from 'src/decks/deck.entity';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card, UserSpaceDeckCard, Deck])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
