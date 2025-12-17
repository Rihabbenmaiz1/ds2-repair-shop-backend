import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Intervention } from '../../interventions/entities/intervention.entity';

@Entity()
// table mta3 spare parts (pieces de rechange)
export class SparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // esm mta3 piece (ex: Ecran OLED)
  name: string;

  @Column()
  // stock actuel mta3 piece
  stock: number;

  @Column('decimal', { precision: 10, scale: 2 })
  // prix mta3 piece
  price: number;

  @ManyToMany(() => Intervention, (intervention) => intervention.spareParts)
  // piece wa7da tnajem nesta3mlouha fi barsha interventions
  interventions: Intervention[];
}

