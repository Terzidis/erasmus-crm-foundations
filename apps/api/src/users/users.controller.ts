import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List users (tenant-scoped) - skeleton' })
  list() {
    return this.users.list();
  }

  @Post()
  @ApiOperation({ summary: 'Create user (tenant-scoped) - skeleton' })
  create(@Body() body: any) {
    return this.users.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id - skeleton' })
  get(@Param('id') id: string) {
    return this.users.get(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user - skeleton' })
  update(@Param('id') id: string, @Body() body: any) {
    return this.users.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user - skeleton' })
  remove(@Param('id') id: string) {
    return this.users.remove(id);
  }
}
