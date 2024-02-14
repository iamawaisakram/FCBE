// // src/spaces/spaces.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Space } from './space.entity';

// @Injectable()
// export class SpacesService {
//   constructor(
//     @InjectRepository(Space)
//     private readonly spaceRepository: Repository<Space>,
//   ) {}

//   async getUserSpaces(userId: number): Promise<Space[]> {
//     return this.spaceRepository.find({ where: { userId } } as any);
//     // OR use type assertion: return this.spaceRepository.find({ where: { userId } } as FindManyOptions<Space>);
//   }
// }
