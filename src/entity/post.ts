import { Entity, PrimaryColumn, Column, Generated } from 'typeorm';

@Entity('sample01_post')
export class Post {

  @PrimaryColumn('integer')
  @Generated()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column('int', { nullable: false })
  likesCount: number;
}
