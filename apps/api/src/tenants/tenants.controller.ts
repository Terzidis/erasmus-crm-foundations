import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { TenantsService } from './tenants.service';

@ApiTags('tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenants: TenantsService) {}

  @Get()
  @ApiOperation({ summary: 'List tenants (Admin) - skeleton' })
  list() {
    return this.tenants.list();
  }

  @Post()
  @ApiOperation({ summary: 'Create tenant (Admin) - skeleton' })
  create(@Body() body: { name: string }) {
    return this.tenants.create(body.name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tenant by id (Admin) - skeleton' })
  get(@Param('id') id: string) {
    return this.tenants.get(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update tenant (Admin) - skeleton' })
  update(@Param('id') id: string, @Body() body: { name?: string }) {
    return this.tenants.update(id, body);
  }
}
