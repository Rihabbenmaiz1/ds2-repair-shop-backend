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
// table mta3 intervention
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  // date automatique mta3 intervention
  date: Date;

  @Column()
  // description chnoua tsalla7
  description: string;

  @ManyToOne(() => User, (user) => user.interventions)
  // technicien eli 3mal intervention
  technician: User;

  @ManyToOne(() => Device, (device) => device.interventions)
  // device eli tetsala7
  device: Device;

  @ManyToMany(() => SparePart, (sparePart) => sparePart.interventions)
  @JoinTable()
  // spare parts mesta3mla
  spareParts: SparePart[];
}



