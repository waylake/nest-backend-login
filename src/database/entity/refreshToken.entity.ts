import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'RefreshToken' })
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ type: 'text' })
  refreshToken: string;

  @Column({ type: 'datetime', nullable: true })
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isBlocked: boolean;
}
