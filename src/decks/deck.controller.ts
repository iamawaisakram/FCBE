import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
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
  @Request() req: { user: User, body: { space: Space } }, // Extract space from req.body
): Promise<Deck> {
  const { user, body: { space } } = req;

  // Check if space is defined before calling createDeck
  // if (!space) {
  //   console.error('Space is undefined in the request', req);
  //   throw new Error('Space is undefined in the request');
  // }

  return this.deckService.createDeck(name, user, space);
}

}
