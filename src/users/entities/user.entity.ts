import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user-role.enum';
import { Intervention } from '../../interventions/entities/intervention.entity';

@Entity()
// table mta3 users (admin wala technicien)
export class User {
  @PrimaryGeneratedColumn()
  // id yetkhal9 automatiquement
  id: number;

  @Column({ unique: true })
  // email unique bech maykounech fama  deux comptes kif kif
  email: string;

  @Column()
  // password yetkhazen hashé 
  password: string;

  @Column()
  // username mta3 user
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TECH,
  })
  // role mta3 user: ADMIN wala TECH
  role: UserRole;

  @OneToMany(() => Intervention, (intervention) => intervention.technician)
  // technicien wa7ed ynajem ya3mel barcha interventions
  interventions: Intervention[];
}

