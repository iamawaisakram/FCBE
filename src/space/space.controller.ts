import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SpaceService } from './space.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('spaces')
@UseGuards(AuthGuard('jwt'))
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  async createSpace(@Body('name') name: string) {
    return this.spaceService.createSpace(name);
  }
}
