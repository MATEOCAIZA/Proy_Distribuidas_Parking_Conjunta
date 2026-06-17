import { Module } from '@nestjs/common';
import { RoleusersService } from './roleusers.service';
import { RoleusersController } from './roleusers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/roleuser.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole, User, Role])],
  controllers: [RoleusersController],
  providers: [RoleusersService],
  exports: [RoleusersService],
})
export class RoleusersModule {}
