import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deck } from 'src/decks/deck.entity';
import User from 'src/user/user.entity';
import { Space } from 'src/space/space.entity';
import { UserSpaceDeckCard } from './user-space-deck-card.entity';
import { Card } from './card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
    @InjectRepository(UserSpaceDeckCard)
    private readonly userSpaceDeckCardRepository: Repository<UserSpaceDeckCard>,
  ) {}

  async createCardInDeck(deckId: number, cardName: string, user: User, space: Space): Promise<Card> {
  try {
    // console.log('Received deck ID:', deckId);

    // Find the deck
    const deck = await this.deckRepository.findOneOrFail({ where: { id: deckId }, relations: ['userSpaceDeckCards'] });
    // console.log('Found deck:', deck);

    // Create a new card
    const card = this.cardRepository.create({ name: cardName });
    const savedCard = await this.cardRepository.save(card);

    // Create a new user_space_deck_card entry
    const userSpaceDeckCard = this.userSpaceDeckCardRepository.create({
      user,
      space,
      deck,
      card: savedCard,
    });

    await this.userSpaceDeckCardRepository.save(userSpaceDeckCard);

    return savedCard;
  } catch (error) {
    console.error('Error creating card in deck:', error);
    throw error;
  }
}



 async getCardsInDeck(deckId: string): Promise<Card[]> {
  const userSpaceDeckCards = await this.userSpaceDeckCardRepository.find({
    where: { deck: { id: +deckId } },
    relations: ['card'],
  });

  return userSpaceDeckCards.map((usdc) => usdc.card);
}

}
