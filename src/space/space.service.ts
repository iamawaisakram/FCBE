import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space } from './space.entity';
import { UserSpace } from './user-space.entity';

@Injectable()
export class SpaceService {

  constructor(
    @InjectRepository(Space)
    private readonly spaceRepository: Repository<Space>,
    @InjectRepository(UserSpace)
    private readonly userSpaceRepository: Repository<UserSpace>,
  ) {}

   async createSpace(name: string, userId: number): Promise<Space> {
    const space = this.spaceRepository.create({ name });
    const savedSpace = await this.spaceRepository.save(space);

    const userSpace = this.userSpaceRepository.create({
      user: { id: userId },
      space: { id: savedSpace.id },
    });

    await this.userSpaceRepository.save(userSpace);

    return savedSpace;
  }


   async getSpaceById(spaceId: number): Promise<Space> {
    // Use findOne with conditions to find a space by ID
    const space = await this.spaceRepository.findOne({
      where: {
        id: spaceId,
      },
    });

    // Check if the space exists
    if (!space) {
      throw new NotFoundException('Space not found');
    }

    return space;
  }

  async getAllSpaces(userId: number): Promise<Space[]> {
    //To fetch all spaces associated with a user from userSpaceRepository
    const userSpaces = await this.userSpaceRepository.find({
      where: { user: { id: userId } },
      relations: ['space'],
    });

    return userSpaces.map((userSpace) => userSpace.space);
  }

  async updateSpace(spaceId: number, name: string): Promise<Space> {
    //To update a space's name in the spaceRepository
    const space = await this.getSpaceById(spaceId);

    space.name = name;

    return this.spaceRepository.save(space);
  }

  async deleteSpace(spaceId: number): Promise<void> {
    //To deletie a space and its associations in the spaceRepository and userSpaceRepository
    const space = await this.getSpaceById(spaceId);

    //To Delete the space from user_space table
    await this.userSpaceRepository.delete({ space: { id: space.id } });

    //To Delete the space from the space table
    await this.spaceRepository.delete(spaceId);
  }
}
