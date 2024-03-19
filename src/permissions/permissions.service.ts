import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpacePermission } from './space-permission.entity';
import { DeckPermission } from './deck-permission.entity';
import { CardPermission } from './card-permission.entity';
import { GrantPermissionDto } from './dto/grant-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(SpacePermission)
    private readonly spacePermissionRepository: Repository<SpacePermission>,
    @InjectRepository(DeckPermission)
    private readonly deckPermissionRepository: Repository<DeckPermission>,
    @InjectRepository(CardPermission)
    private readonly cardPermissionRepository: Repository<CardPermission>,
  ) {}

  async grantSpacePermission(grantPermissionDto: GrantPermissionDto) {
    //
  }

  async grantDeckPermission(grantPermissionDto: GrantPermissionDto) {
    //
  }

  async grantCardPermission(grantPermissionDto: GrantPermissionDto) {
    //
  }
}
