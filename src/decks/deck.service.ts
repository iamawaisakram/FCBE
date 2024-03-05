import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deck } from './deck.entity';
import User from 'src/user/user.entity';
import { Space } from 'src/space/space.entity';
import { UserSpaceDeck } from './user-space-deck.entity';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
    @InjectRepository(UserSpaceDeck)
    private readonly userSpaceDeckRepository: Repository<UserSpaceDeck>,
  ) {}

  async createDeck(name: string, user: User, space: Space): Promise<Deck> {


    // Creating a new deck
    const deck = this.deckRepository.create({ name });
    const savedDeck = await this.deckRepository.save(deck);

    // Creating a new user_space_deck entry
    const userSpaceDeck = this.userSpaceDeckRepository.create({
      user,
      deck: savedDeck,
    });

    // Setting the space property explicitly
    userSpaceDeck.space = space;

    await this.userSpaceDeckRepository.save(userSpaceDeck);

    return savedDeck;
  }
}
