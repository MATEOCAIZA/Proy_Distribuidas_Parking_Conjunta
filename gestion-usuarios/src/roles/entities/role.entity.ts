import { UserRole } from "src/roleusers/entities/roleuser.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
 
  @Column({ default: true })
  active!: boolean;
 
  @CreateDateColumn()
  created_at!: Date;
 
  @Column({ type: 'text', nullable: true })
  description!: string;
 
  @Column({ unique: true })
  name!: string;
 
  @UpdateDateColumn()
  updated_at!: Date;
 
  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles!: UserRole[];
}
 