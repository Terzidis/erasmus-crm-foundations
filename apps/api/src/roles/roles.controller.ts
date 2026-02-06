import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesService } from './roles.service';

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly roles: RolesService) {}

  // -------- Roles --------

  @Get()
  @ApiOperation({ summary: 'List roles - skeleton' })
  list() {
    return this.roles.list();
  }

  @Post()
  @ApiOperation({ summary: 'Create role - skeleton' })
  create(@Body() body: { name: string }) {
    return this.roles.create(body.name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by id - skeleton' })
  get(@Param('id') id: string) {
    return this.roles.get(id);
  }

  // -------- Role Permissions (role_permissions) --------

  @Get(':id/permissions')
  @ApiOperation({ summary: 'List role permissions - skeleton' })
  listPermissions(@Param('id') id: string) {
    return this.roles.listPermissions(id);
  }

  @Post(':id/permissions')
  @ApiOperation({ summary: 'Assign permission to role - skeleton' })
  assignPermission(
    @Param('id') id: string,
    @Body() body: { permissionId: string },
  ) {
    return this.roles.assignPermission(id, body.permissionId);
  }

  @Delete(':id/permissions/:permissionId')
  @ApiOperation({ summary: 'Remove permission from role - skeleton' })
  removePermission(
    @Param('id') id: string,
    @Param('permissionId') permissionId: string,
  ) {
    return this.roles.removePermission(id, permissionId);
  }
}
