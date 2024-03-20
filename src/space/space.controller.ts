import { Controller, Post, Body, UseGuards, Request, Delete, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { SpaceService } from './space.service';
import { AuthGuard } from '@nestjs/passport';
import { Space } from './space.entity';

@Controller('spaces')
@UseGuards(AuthGuard('jwt'))
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  async createSpace(@Body('name') name: string, @Request() req): Promise<Space> {
    const userId = req.user.id; // To get user id from request
    return this.spaceService.createSpace(name, userId);
  }

  @Get()
  async getAllSpaces(@Request() req): Promise<Space[]> {
    const userId = req.user.id;
    return this.spaceService.getAllSpaces(userId);
  }

  @Get(':id')
  async getSpaceById(@Param('id', ParseIntPipe) spaceId: number): Promise<Space> {
    return this.spaceService.getSpaceById(spaceId);
  }

  @Put(':id')
  async updateSpace(@Param('id', ParseIntPipe) spaceId: number, @Body('name') name: string): Promise<Space> {
    return this.spaceService.updateSpace(spaceId, name);
  }

  @Delete(':id')
  async deleteSpace(@Param('id', ParseIntPipe) spaceId: number): Promise<void> {
    return this.spaceService.deleteSpace(spaceId);
  }
}
