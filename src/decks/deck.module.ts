import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './deck.entity';
import { UserSpaceDeck } from './user-space-deck.entity';
import { DeckService } from './deck.service';
import { DeckController } from './deck.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deck, UserSpaceDeck])],
  providers: [DeckService],
  controllers: [DeckController],
})
export class DeckModule {}
