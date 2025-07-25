import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany } from "typeorm";

@Entity('UsersEntity')
export class Users {

    @PrimaryGeneratedColumn()
    userID: number;

    @Column('text')
    username: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string;

    @DeleteDateColumn({ name: 'deletedAt' })
    deletedAt: Date;
}