import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne } from "typeorm";

@Entity('EmployeeEntity') 
export class Employee{
    
    @PrimaryGeneratedColumn()
    employeeID: number;

    @Column('text')
    name: string;

    @Column('text')
    username: string;

    @Column('text')
    password: string;

    @Column('text')
    department: string;

    @Column('int')
    createdByUserID: number;

   @DeleteDateColumn({ name: 'deletedAt' })
    deletedAt: Date;
} 