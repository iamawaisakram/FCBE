import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardService } from './card.service';
import { Card } from './card.entity';
import User from 'src/user/user.entity';
import { Space } from 'src/space/space.entity';
import { Answer } from './answer.entity';
import { Clue } from './clue.entity';

@Controller('cards')
@UseGuards(AuthGuard('jwt'))
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post(':deckId')
  async createCardInDeck(
    @Param('deckId') deckId: string, // 'deckId' is of type string
    @Body() cardData: { name: string, space: Space, answers?: Answer[], clues?: Clue[] },
    @Request() req: { user: User },
  ): Promise<Card> {
    const { user } = req;
    return this.cardService.createCardInDeck(+deckId, { ...cardData, user }); // Converting 'deckId' to number
  }

  @Get(':deckId')
  async getCardsInDeck(@Param('deckId') deckId: string): Promise<Card[]> {
    return this.cardService.getCardsInDeck(deckId);
  }
}
