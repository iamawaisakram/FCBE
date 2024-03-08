import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardService } from './card.service';
import { Card } from './card.entity';
import User from 'src/user/user.entity';
import { Space } from 'src/space/space.entity';

@Controller('cards')
@UseGuards(AuthGuard('jwt'))
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post(':deckId')
  async createCardInDeck(
    @Param('deckId') deckId: string, // 'deckId' is of type string
    @Body('name') cardName: string,
    @Request() req: { user: User, body: { space: Space } },
  ): Promise<Card> {
    const { user, body: { space } } = req;
    return this.cardService.createCardInDeck(+deckId, cardName, user, space); // Converting 'deckId' to number
  }

  @Get(':deckId')
  async getCardsInDeck(@Param('deckId') deckId: string): Promise<Card[]> {
    return this.cardService.getCardsInDeck(deckId);
  }
}
