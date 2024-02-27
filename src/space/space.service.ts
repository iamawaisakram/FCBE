import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space } from './space.entity';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private spaceRepository: Repository<Space>,
  ) {}

  async createSpace(name: string): Promise<Space> {
    const space = this.spaceRepository.create({ name });
    return await this.spaceRepository.save(space);
  }
}
