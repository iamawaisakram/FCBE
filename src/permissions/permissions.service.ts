import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpacePermission } from './space-permission.entity';
import { DeckPermission } from './deck-permission.entity';
import { CardPermission } from './card-permission.entity';
import { GrantPermissionDto } from './dto/grant-permission.dto';
import { Space } from 'src/space/space.entity';
import { Deck } from 'src/decks/deck.entity';
import { Card } from 'src/card/card.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(SpacePermission)
    private readonly spacePermissionRepository: Repository<SpacePermission>,
    @InjectRepository(DeckPermission)
    private readonly deckPermissionRepository: Repository<DeckPermission>,
    @InjectRepository(CardPermission)
    private readonly cardPermissionRepository: Repository<CardPermission>,
    @InjectRepository(Space)
    private readonly spaceRepository: Repository<Space>,
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async grantSpacePermission(grantPermissionDto: GrantPermissionDto) {
    // Checking if the user granting permission is the owner of the space
    const space = await this.spaceRepository.findOne({
      where: { id: grantPermissionDto.spaceId },
    });
    if (!space) {
      throw new NotFoundException('Space not found');
    }
    if (space.ownerId !== grantPermissionDto.ownerId) {
      throw new ForbiddenException('You are not the owner of this space');
    }

    // Creating and save space permission entity
    const spacePermission = this.spacePermissionRepository.create({
      ...grantPermissionDto,
      space,
    });
    await this.spacePermissionRepository.save(spacePermission);

    return spacePermission;
  }

  async grantDeckPermission(grantPermissionDto: GrantPermissionDto) {
    // Checking if the user granting permission is the owner of the deck
    const deck = await this.deckRepository.findOne({
      where: { id: grantPermissionDto.deckId },
    });
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    if (deck.ownerId !== grantPermissionDto.ownerId) {
      throw new ForbiddenException('You are not the owner of this deck');
    }

    // Creating and save deck permission entity
    const deckPermission = this.deckPermissionRepository.create({
      ...grantPermissionDto,
      deck,
    });
    await this.deckPermissionRepository.save(deckPermission);

    return deckPermission;
  }

  async grantCardPermission(grantPermissionDto: GrantPermissionDto) {
    // Checking if the user granting permission is the owner of the card
    const card = await this.cardRepository.findOne({
      where: { id: grantPermissionDto.cardId },
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    if (card.ownerId !== grantPermissionDto.ownerId) {
      throw new ForbiddenException('You are not the owner of this card');
    }

    // Creating and save card permission entity.
    const cardPermission = this.cardPermissionRepository.create({
      ...grantPermissionDto,
      card,
    });
    await this.cardPermissionRepository.save(cardPermission);

    return cardPermission;
  }
}
