import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Temperature {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  time: Date;

  @Column({ nullable: false })
  sensorid: number;

  @Column({ type: 'decimal', nullable: false })
  temperature: number;
}
