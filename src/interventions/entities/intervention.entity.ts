import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Device } from '../../devices/entities/device.entity';
import { SparePart } from '../../parts/entities/spare-part.entity';

@Entity()
// table mta3 intervention (عملية التصليح)
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  // date mta3 intervention tetkhazen automatiquement
  date: Date;

  @Column()
  // description mta3 chnoua tsalla7
  description: string;

  @ManyToOne(() => User, (user) => user.interventions, { eager: true })
  // technicien ely 3mal el intervention
  technician: User;

  @ManyToOne(() => Device, (device) => device.interventions, { eager: true })
  // device ely tetsalah
  device: Device;

  @ManyToMany(() => SparePart, (sparePart) => sparePart.interventions, {
    eager: true,
  })
  @JoinTable()
  // spare parts ely testa3malhom fy el  intervention
  spareParts: SparePart[];
}

