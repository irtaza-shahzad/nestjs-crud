import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne } from "typeorm";

@Entity('StudentEntity') 
export class Student{
    
    @PrimaryGeneratedColumn()
    studentID: number;

    @Column('text')
    name: string;

    @Column('text')
    username: string;

    @Column('text')
    password: string;

    @Column('decimal', { precision: 3, scale: 2 })
    cgpa: number;

    @Column('text')
    department: string;

    @Column('int')
    createdByUserID: number;

    @Column('int')
    createdByEmpID: number;

   @DeleteDateColumn({ name: 'deletedAt' })
    deletedAt: Date;
} 