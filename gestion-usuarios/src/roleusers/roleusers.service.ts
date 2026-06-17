import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entities/roleuser.entity';
import { CreateRoleuserDto } from './dto/create-roleuser.dto';
import { UpdateRoleuserDto } from './dto/update-roleuser.dto';

@Injectable()
export class RoleusersService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async create(createRoleuserDto: CreateRoleuserDto): Promise<UserRole> {
    const existing = await this.userRoleRepository.findOne({
      where: {
        id_user: createRoleuserDto.id_user,
        id_role: createRoleuserDto.id_role,
      },
    });
    if (existing) {
      throw new ConflictException(
        `El usuario "${createRoleuserDto.id_user}" ya tiene asignado el rol "${createRoleuserDto.id_role}"`,
      );
    }

    const userRole = this.userRoleRepository.create({
      id_user: createRoleuserDto.id_user,
      id_role: createRoleuserDto.id_role,
      active: createRoleuserDto.active ?? true,
    });

    return this.userRoleRepository.save(userRole);
  }

  async findAll(): Promise<UserRole[]> {
    return this.userRoleRepository.find({
      relations: { user: true, role: true },
    });
  }

  async findOne(id_user: string, id_role: string): Promise<UserRole> {
    const userRole = await this.userRoleRepository.findOne({
      where: { id_user, id_role },
      relations: { user: true, role: true },
    });
    if (!userRole) {
      throw new NotFoundException(
        `Asignación de usuario "${id_user}" con rol "${id_role}" no encontrada`,
      );
    }
    return userRole;
  }

  async findByUser(id_user: string): Promise<UserRole[]> {
    return this.userRoleRepository.find({
      where: { id_user },
      relations: { role: true },
    });
  }

  async update(
    id_user: string,
    id_role: string,
    updateRoleuserDto: UpdateRoleuserDto,
  ): Promise<UserRole> {
    const userRole = await this.findOne(id_user, id_role);
    userRole.active = updateRoleuserDto.active;
    return this.userRoleRepository.save(userRole);
  }

  async remove(id_user: string, id_role: string): Promise<{ message: string }> {
    const userRole = await this.findOne(id_user, id_role);
    await this.userRoleRepository.remove(userRole);
    return {
      message: `Asignación del usuario "${id_user}" con rol "${id_role}" eliminada correctamente`,
    };
  }
}
