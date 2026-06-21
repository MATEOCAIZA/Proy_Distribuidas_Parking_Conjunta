import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RoleusersService } from './roleusers.service';
import { CreateRoleuserDto } from './dto/create-roleuser.dto';
import { UpdateRoleuserDto } from './dto/update-roleuser.dto';

@ApiTags('Role-Users')
@Controller('roleusers')
export class RoleusersController {
  constructor(private readonly roleusersService: RoleusersService) {}

  // POST /roleusers  { id_user, id_role, active? }
  @Post()
  @ApiOperation({ summary: 'Asignar rol a usuario', description: 'Crea una nueva asignación de rol a un usuario' })
  @ApiResponse({ status: 201, description: 'Rol asignado al usuario exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'La asignación ya existe' })
  create(@Body() createRoleuserDto: CreateRoleuserDto) {
    return this.roleusersService.create(createRoleuserDto);
  }

  // GET /roleusers
  @Get()
  @ApiOperation({ summary: 'Listar asignaciones rol-usuario', description: 'Obtiene todas las asignaciones de roles a usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de asignaciones obtenida exitosamente' })
  findAll() {
    return this.roleusersService.findAll();
  }

  // GET /roleusers/user/:id_user  — todas las asignaciones de un usuario
  @Get('user/:id_user')
  @ApiOperation({ summary: 'Obtener roles de un usuario', description: 'Lista todas las asignaciones de rol de un usuario específico' })
  @ApiParam({ name: 'id_user', description: 'UUID del usuario', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: 200, description: 'Asignaciones del usuario obtenidas' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findByUser(@Param('id_user', ParseUUIDPipe) id_user: string) {
    return this.roleusersService.findByUser(id_user);
  }

  @Get('role/:role_name')
  @ApiOperation({ summary: 'Obtener usuarios por rol', description: 'Lista todos los usuarios que tienen asignado un rol específico' })
  @ApiParam({ name: 'role_name', description: 'Nombre del rol', example: 'ADMIN' })
  @ApiResponse({ status: 200, description: 'Usuarios con el rol obtenidos' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  findByRole(@Param('role_name', ParseUUIDPipe) role_name: string) {
    return this.roleusersService.findByRole(role_name);
  }

  // GET /roleusers/:id_user/:id_role  — una asignación específica
  @Get(':id_user/:id_role')
  @ApiOperation({ summary: 'Obtener asignación específica', description: 'Busca una asignación rol-usuario por los IDs de usuario y rol' })
  @ApiParam({ name: 'id_user', description: 'UUID del usuario', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiParam({ name: 'id_role', description: 'UUID del rol', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @ApiResponse({ status: 200, description: 'Asignación encontrada' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  findOne(
    @Param('id_user', ParseUUIDPipe) id_user: string,
    @Param('id_role', ParseUUIDPipe) id_role: string,
  ) {
    return this.roleusersService.findOne(id_user, id_role);
  }

  // PATCH /roleusers/:id_user/:id_role  { active: boolean }
  @Patch('/activate/:id_user/:id_role')
  @ApiOperation({ summary: 'Activar asignación rol-usuario', description: 'Activa una asignación de rol a usuario previamente desactivada' })
  @ApiParam({ name: 'id_user', description: 'UUID del usuario', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiParam({ name: 'id_role', description: 'UUID del rol', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @ApiResponse({ status: 200, description: 'Asignación activada exitosamente' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  activate(
    @Param('id_user', ParseUUIDPipe) id_user: string,
    @Param('id_role', ParseUUIDPipe) id_role: string
  ) {
    return this.roleusersService.activate(id_user, id_role);
  }

  @Patch('/deactivate/:id_user/:id_role')
  @ApiOperation({ summary: 'Desactivar asignación rol-usuario', description: 'Desactiva una asignación de rol a usuario (borrado lógico)' })
  @ApiParam({ name: 'id_user', description: 'UUID del usuario', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiParam({ name: 'id_role', description: 'UUID del rol', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @ApiResponse({ status: 200, description: 'Asignación desactivada exitosamente' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  deactivate(
    @Param('id_user', ParseUUIDPipe) id_user: string,
    @Param('id_role', ParseUUIDPipe) id_role: string,
  ) {
    return this.roleusersService.deactivate(id_user, id_role);
  }

  // DELETE /roleusers/:id_user/:id_role
  @Delete(':id_user/:id_role')
  @ApiOperation({ summary: 'Eliminar asignación rol-usuario', description: 'Elimina una asignación de rol a usuario de forma permanente' })
  @ApiParam({ name: 'id_user', description: 'UUID del usuario', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiParam({ name: 'id_role', description: 'UUID del rol', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @ApiResponse({ status: 200, description: 'Asignación eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  remove(
    @Param('id_user', ParseUUIDPipe) id_user: string,
    @Param('id_role', ParseUUIDPipe) id_role: string,
  ) {
    return this.roleusersService.remove(id_user, id_role);
  }
}
