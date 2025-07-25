import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { createEmployeeDto } from './employee.dto';

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee) private readonly employeeRepo: Repository<Employee>) { }
    
    async getAllEmployees(): Promise<createEmployeeDto[]>{
        return await this.employeeRepo.find();
    }

    async addNewEmployee(emp: createEmployeeDto): Promise<createEmployeeDto>{
        const newEmp : (createEmployeeDto | null) = await this.employeeRepo.create(emp);

        if (!newEmp)
            throw new NotFoundException();
        return await this.employeeRepo.save(newEmp);
    }

    async getEmployeeByID(employeeID: number): Promise<createEmployeeDto> {
        const emp : (createEmployeeDto | null) = await this.employeeRepo.findOneBy({ employeeID });

        if (!emp)
            throw new NotFoundException();
        return emp;
    }

    async getEmployeeCount(): Promise<number>{
        const empCount: (number | null) = await this.employeeRepo.count();
        if (!empCount)
            throw new NotFoundException();
        return empCount; 
    }

    async deleteEmployeeByID(employeeID : number): Promise<void>{
        const emp: (createEmployeeDto | null) = await this.employeeRepo.findOneBy({ employeeID });
        
        if (!createEmployeeDto)
            throw new NotFoundException();
        await this.employeeRepo.softDelete({ employeeID });
    }

    async recoverDeletedEmployee(employeeID: number): Promise<void> {
        const emp = await this.employeeRepo.findOne({ where: { employeeID }, withDeleted: true });

        if (!emp)
            throw new NotFoundException(`Employee with employee id ${employeeID} does not exist`);

        if (!emp.deletedAt)
            throw new NotFoundException(`Employee with employee id ${employeeID} is not deleted`);
        await this.employeeRepo.restore(employeeID);
        console.log(`Employee with employee ID: ${employeeID} restored successfully!`);
    }

    async changeDepartment(employeeID: number, department: string): Promise<void>{
        const emp: (createEmployeeDto | null) = await this.employeeRepo.findOneBy({ employeeID });
        if (!emp)
            throw new NotFoundException();
        await this.employeeRepo.update({ employeeID }, { department });
    }
}