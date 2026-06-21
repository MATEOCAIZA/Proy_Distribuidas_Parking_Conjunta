import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@ApiTags('Personas')
@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear persona', description: 'Registra una nueva persona en el sistema' })
  @ApiResponse({ status: 201, description: 'Persona creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'Ya existe una persona con ese DNI o email' })
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personasService.create(createPersonaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar personas', description: 'Obtiene la lista de todas las personas registradas' })
  @ApiResponse({ status: 200, description: 'Lista de personas obtenida exitosamente' })
  findAll() {
    return this.personasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener persona por ID', description: 'Busca una persona por su identificador UUID' })
  @ApiParam({ name: 'id', description: 'UUID de la persona', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: 200, description: 'Persona encontrada' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  findOne(@Param('id') id: string) {
    return this.personasService.findOne(id);
  }

  @Get('dni/:dni')
  @ApiOperation({ summary: 'Obtener persona por DNI', description: 'Busca una persona por su cédula ecuatoriana' })
  @ApiParam({ name: 'dni', description: 'Cédula ecuatoriana de 10 dígitos', example: '1712345678' })
  @ApiResponse({ status: 200, description: 'Persona encontrada' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  findByDni(@Param('dni') dni: string) {
    return this.personasService.findByDni(dni);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar persona', description: 'Actualiza los datos de una persona existente' })
  @ApiParam({ name: 'id', description: 'UUID de la persona a actualizar', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: 200, description: 'Persona actualizada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personasService.update(id, updatePersonaDto);
  }

  @Patch('/activate/:id')
  @ApiOperation({ summary: 'Activar persona', description: 'Activa una persona previamente desactivada' })
  @ApiParam({ name: 'id', description: 'UUID de la persona a activar', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: 200, description: 'Persona activada exitosamente' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  activate(@Param('id') id: string) {
    return this.personasService.activate(id);
  }

  @Patch('/deactivate/:id')
  @ApiOperation({ summary: 'Desactivar persona', description: 'Desactiva una persona (borrado lógico)' })
  @ApiParam({ name: 'id', description: 'UUID de la persona a desactivar', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiResponse({ status: 200, description: 'Persona desactivada exitosamente' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  deactivate(@Param('id') id: string) {
    return this.personasService.deactivate(id);
  }

}
