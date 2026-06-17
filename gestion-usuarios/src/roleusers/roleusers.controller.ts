import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RoleusersService } from './roleusers.service';
import { CreateRoleuserDto } from './dto/create-roleuser.dto';
import { UpdateRoleuserDto } from './dto/update-roleuser.dto';

@Controller('roleusers')
export class RoleusersController {
  constructor(private readonly roleusersService: RoleusersService) {}

  // POST /roleusers  { id_user, id_role, active? }
  @Post()
  create(@Body() createRoleuserDto: CreateRoleuserDto) {
    return this.roleusersService.create(createRoleuserDto);
  }

  // GET /roleusers
  @Get()
  findAll() {
    return this.roleusersService.findAll();
  }

  // GET /roleusers/user/:id_user  — todas las asignaciones de un usuario
  @Get('user/:id_user')
  findByUser(@Param('id_user', ParseUUIDPipe) id_user: string) {
    return this.roleusersService.findByUser(id_user);
  }

  // GET /roleusers/:id_user/:id_role  — una asignación específica
  @Get(':id_user/:id_role')
  findOne(
    @Param('id_user', ParseUUIDPipe) id_user: string,
    @Param('id_role', ParseUUIDPipe) id_role: string,
  ) {
    return this.roleusersService.findOne(id_user, id_role);
  }

  // PATCH /roleusers/:id_user/:id_role  { active: boolean }
  @Patch(':id_user/:id_role')
  update(
    @Param('id_user', ParseUUIDPipe) id_user: string,
    @Param('id_role', ParseUUIDPipe) id_role: string,
    @Body() updateRoleuserDto: UpdateRoleuserDto,
  ) {
    return this.roleusersService.update(id_user, id_role, updateRoleuserDto);
  }

  // DELETE /roleusers/:id_user/:id_role
  @Delete(':id_user/:id_role')
  remove(
    @Param('id_user', ParseUUIDPipe) id_user: string,
    @Param('id_role', ParseUUIDPipe) id_role: string,
  ) {
    return this.roleusersService.remove(id_user, id_role);
  }
}
