import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  time?: Date;
  @Column({nullable: false, unique: true})
  username: string;
  @Column({nullable: false})
  password: string;
  @Column({nullable: false})
  role: number;
}