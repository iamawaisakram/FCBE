import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deck } from 'src/decks/deck.entity';
import User from 'src/user/user.entity';
import { Space } from 'src/space/space.entity';
import { UserSpaceDeckCard } from './user-space-deck-card.entity';
import { Card } from './card.entity';
import { Answer } from './answer.entity';
import { Clue } from './clue.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
    @InjectRepository(UserSpaceDeckCard)
    private readonly userSpaceDeckCardRepository: Repository<UserSpaceDeckCard>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Clue)
    private readonly clueRepository: Repository<Clue>,
  ) {}

  async createCardInDeck(deckId: number, cardData: { name: string, user: User, space: Space, answers?: Answer[], clues?: Clue[] }): Promise<Card> {
    try {
      const deck = await this.deckRepository.findOneOrFail({ where: { id: deckId }, relations: ['userSpaceDeckCards'] });

      const card = this.cardRepository.create({ name: cardData.name });
      const savedCard = await this.cardRepository.save(card);

      const userSpaceDeckCard = this.userSpaceDeckCardRepository.create({
        user: cardData.user,
        space: cardData.space,
        deck,
        card: savedCard,
      });

      await this.userSpaceDeckCardRepository.save(userSpaceDeckCard);

     //Answer

      if (cardData.answers) {
        const answers = cardData.answers.map(answer => this.answerRepository.create({ ...answer, card: savedCard }));
        await this.answerRepository.save(answers);
      }

      //Clue

      if (cardData.clues) {
        const clues = cardData.clues.map(clue => this.clueRepository.create({ ...clue, card: savedCard }));
        await this.clueRepository.save(clues);
      }

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
