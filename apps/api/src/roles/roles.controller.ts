import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesService } from './roles.service';

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly roles: RolesService) {}

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
}
