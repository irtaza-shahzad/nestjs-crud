import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { StudentService } from './student.service';
import { createStudentDto } from './student.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('students')
export class StudentController {
    constructor(private readonly studService: StudentService) { }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    getStudents(): Promise<createStudentDto[]>{
        return this.studService.getAllStudents();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/high-achievers')
    getHighAchievers(): Promise<createStudentDto[]>{
        return this.studService.getHighAchievers();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/count')
    getStudentCount(): Promise<number>{
        return this.studService.getStudentCount();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/:rollNo')
    getStudentByRollNo(@Param() params: { rollNo: number }): Promise<createStudentDto> {
        return this.studService.getStudentByRollNumber(params.rollNo);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addStudent(@Body() student: createStudentDto, @Request() req): Promise<createStudentDto> {
        student.createdByUserID = req.user.userID;
        return this.studService.addStudent(student);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:studentID/cgpa')
    updateCGPA(@Param() params: {studentID : number}, @Body() body: {cgpa : number}): Promise<void> {
        return this.studService.update_CGPA(params.studentID, body.cgpa);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:rollNo/department')
    changeDepartment(@Param() params: {rollNo : number}, @Body() body: {department : string}): Promise<void> {
        return this.studService.changeDepartment(params.rollNo, body.department);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:rollNo')
    removeStudentByRollNo(@Param() params: { rollNo: number }): Promise<void>{
        return this.studService.removeStudentByRollNo(params.rollNo);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:rollNo/restore')
    restoreDeletedStudent(@Param() params: { rollNo: number }): Promise<void>{
        return this.studService.restoreStudent(params.rollNo);
    }
}
