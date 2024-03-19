import { Controller, Post, Body } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { GrantPermissionDto } from './dto/grant-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('space')
  async grantSpacePermission(@Body() grantPermissionDto: GrantPermissionDto) {
    return this.permissionsService.grantSpacePermission(grantPermissionDto);
  }

  @Post('deck')
  async grantDeckPermission(@Body() grantPermissionDto: GrantPermissionDto) {
    return this.permissionsService.grantDeckPermission(grantPermissionDto);
  }

  @Post('card')
  async grantCardPermission(@Body() grantPermissionDto: GrantPermissionDto) {
    return this.permissionsService.grantCardPermission(grantPermissionDto);
  }
}
