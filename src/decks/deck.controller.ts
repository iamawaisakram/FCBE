import { Controller, Post, Body, UseGuards, Request, Get, Param, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeckService } from './deck.service';
import { Deck } from './deck.entity';
import User from 'src/user/user.entity';
import { Space } from 'src/space/space.entity';

@Controller('decks')
@UseGuards(AuthGuard('jwt'))
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  async createDeck(
    @Body('name') name: string,
    @Request() req: { user: User, body: { space: Space } },
  ): Promise<Deck> {
    const { user, body: { space } } = req;
    return this.deckService.createDeck(name, user, space);
  }

  @Get()
  async getAllDecks(@Request() req: { user: User }): Promise<Deck[]> {
    const { user } = req;
    return this.deckService.getAllDecks(user);
  }

  @Get(':id')
  async getDeckById(@Param('id') id: string, @Request() req: { user: User }): Promise<Deck> {
    const { user } = req;
    return this.deckService.getDeckById(id, user);
  }

  @Put(':id')
  async updateDeck(
    @Param('id') id: string,
    @Body('name') name: string,
    @Request() req: { user: User },
  ): Promise<Deck> {
    const { user } = req;
    return this.deckService.updateDeck(id, name, user);
  }

  @Delete(':id')
  async deleteDeck(@Param('id') id: string, @Request() req: { user: User }): Promise<void> {
    const { user } = req;
    return this.deckService.deleteDeck(id, user);
  }
}
