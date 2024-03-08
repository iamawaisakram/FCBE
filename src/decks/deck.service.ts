import { Injectable, NotFoundException } from '@nestjs/common';
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
      space,
    });

    await this.userSpaceDeckRepository.save(userSpaceDeck);

    return savedDeck;
  }


async getDecksBySpaceId(spaceId: number): Promise<Deck[]> {
    const userSpaceDecks = await this.userSpaceDeckRepository.find({
      where: { space: { id: spaceId } },
      relations: ['deck'],
    });

    return userSpaceDecks.map((usd) => usd.deck);
  }


  async getAllDecks(user: User): Promise<Deck[]> {
  const userSpaceDecks = await this.userSpaceDeckRepository.find({
    where: { user: { id: user.id } }, // Specify the condition in the 'where' option
    relations: ['deck'], // Specify relations to eager load
  });

  return userSpaceDecks.map((usd) => usd.deck);
}


 async getDeckById(id: string, user: User): Promise<Deck> {
  const userSpaceDeck = await this.userSpaceDeckRepository.findOne({
    where: {
      user: { id: user.id },
      deck: { id: parseInt(id, 10) }, // Convert id to number
    },
    relations: ['deck'],
  });

  if (!userSpaceDeck) {
    throw new NotFoundException('Deck not found.');
  }

  return userSpaceDeck.deck;
}



  async updateDeck(id: string, name: string, user: User): Promise<Deck> {
  const userSpaceDeck = await this.userSpaceDeckRepository.findOne({
    where: {
      user: { id: user.id },
     deck: { id: parseInt(id, 10) },
    },
    relations: ['deck'],
  });

  if (!userSpaceDeck) {
    throw new NotFoundException('Deck not found.');
  }

  userSpaceDeck.deck.name = name;
  await this.deckRepository.save(userSpaceDeck.deck);

  return userSpaceDeck.deck;
}


  async deleteDeck(id: string, user: User): Promise<void> {
  const userSpaceDeck = await this.userSpaceDeckRepository.findOne({
    where: {
      user: { id: user.id },
      deck: { id: parseInt(id, 10) },
    },
    relations: ['deck'],
  });

  if (!userSpaceDeck) {
    throw new NotFoundException('Deck not found.');
  }

  await this.userSpaceDeckRepository.remove(userSpaceDeck);
  await this.deckRepository.remove(userSpaceDeck.deck);
}

}
