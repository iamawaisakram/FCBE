// // src/spaces/spaces.controller.ts
// import { Controller, Get, UseGuards, Request } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { SpacesService } from './spaces.service';

// @Controller('spaces')
// @UseGuards(AuthGuard('jwt'))
// export class SpacesController {
//   constructor(private readonly spacesService: SpacesService) {}

//   @Get()
//   async getUserSpaces(@Request() req) {
//     const userId = req.user.userId; // Assuming your user object has a userId property
//     return this.spacesService.getUserSpaces(userId);
//   }
// }
