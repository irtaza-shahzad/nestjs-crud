import { Controller, Get, Post, Delete, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { createEmployeeDto } from './employee.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('employees')
export class EmployeeController {
    constructor(private readonly empService: EmployeeService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllEmployees(): Promise<createEmployeeDto[]>{
        return this.empService.getAllEmployees();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/count')
    getEmployeeCount(): Promise<number>{
        return this.empService.getEmployeeCount();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:employeeID')
    getEmployeeByID(@Param() params : {employeeID: number}): Promise<createEmployeeDto>{
        return this.empService.getEmployeeByID(params.employeeID);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addNewEmployee(@Body() employee: createEmployeeDto, @Request() req): Promise<createEmployeeDto>{
        employee.createdByUserID = req.user.userID;
        return this.empService.addNewEmployee(employee);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:employeeID')
    deleteEmployee(@Param() params: { employeeID: number }): Promise<void>{
        return this.empService.deleteEmployeeByID(params.employeeID);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:employeeID/restore')
    recoverDeletedEmployee(@Param() params: { employeeID: number }): Promise<void>{
        return this.empService.recoverDeletedEmployee(params.employeeID);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:employeeID/department')
    changeDepartment(
        @Param() params: { employeeID: number },
        @Body() body: { department: string })
        : Promise<void>{
        return this.empService.changeDepartment(params.employeeID, body.department);
    }
}
