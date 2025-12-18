import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeviceStatus } from './device-status.enum';
import { DeviceGrade } from './device-grade.enum';
import { Intervention } from '../../interventions/entities/intervention.entity';

@Entity()
// table mta3 devices elly yode5lou lel atelier 
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  // serial number unique mta3 device
  serialNumber: string;

  @Column({ length: 50 })
  // marque mta3 device (Apple, Samsung...)
  brand: string;

  @Column()
  // model mta3 device
  model: string;

  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.PENDING,
  })
  // status: PENDING, REPAIRING wala READY
  status: DeviceStatus;

  @Column({
    type: 'enum',
    enum: DeviceGrade,
    default: DeviceGrade.NONE,
  })
  // grade mta3 device ba3d repair
  grade: DeviceGrade;

  @OneToMany(() => Intervention, (intervention) => intervention.device)
  // device wa7ed ynajem ykoun 3andou barcha  interventions
  interventions: Intervention[];
}

