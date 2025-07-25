import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { createStudentDto } from './student.dto';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private readonly studentRepo: Repository<Student>) {}
      
    async getAllStudents(): Promise<createStudentDto[]>{
        console.log("in getStudent service");
        return await this.studentRepo.find();
    }

    async addStudent(stud: createStudentDto): Promise<createStudentDto>{
        const newStudent : (createStudentDto | null) = await this.studentRepo.create(stud);

        if (!newStudent) {
            throw new NotFoundException(`there was an error`);
        }
        return await this.studentRepo.save(newStudent);
    }

    async getStudentByRollNumber(studentID:number): Promise<createStudentDto>{
        const student : (createStudentDto | null) = await this.studentRepo.findOneBy({ studentID });

        if (!student) {
            throw new NotFoundException(`student not found -- error`);
        }
        return student;
    }

    async getHighAchievers(): Promise<createStudentDto[]>{
        const studentList: (createStudentDto[] | null) = await this.studentRepo.find({ where: { cgpa: MoreThanOrEqual(3.5) } });
        if (!studentList)
            throw new NotFoundException(`no students were found`);
        return studentList;
    }

    async getStudentCount(): Promise<number>{
        const studentCount: (number | null) = await this.studentRepo.count();
        if (!studentCount)
            throw new NotFoundException(`there was an error in getting student count`);
        return studentCount;
    }

    async removeStudentByRollNo(studentID:number): Promise<void>{
        const student: (createStudentDto | null) = await this.studentRepo.findOneBy({ studentID });
        if (!student)
            throw new NotFoundException(`Student with student ID: ${studentID} does not exist`);
        await this.studentRepo.softDelete({ studentID });
    }

    async update_CGPA(studentID: number, cgpa: number): Promise<void>{
        const student: (createStudentDto | null) = await this.studentRepo.findOneBy({ studentID });
        if (!student)
            throw new NotFoundException(`Student with student ID: ${studentID} does not exist`);
        await this.studentRepo.update({ studentID }, { cgpa });
    }

    async changeDepartment(studentID: number, department: string): Promise<void>{
        const student: (createStudentDto | null) = await this.studentRepo.findOneBy({ studentID });
        if (!student)
            throw new NotFoundException(`Student with student ID: ${studentID} does not exist`);
        await this.studentRepo.update({ studentID }, { department });
    }

    async restoreStudent(studentID: number): Promise<void> {
        const student = await this.studentRepo.findOne({ where: { studentID }, withDeleted: true });
        
        if (!student)
            throw new NotFoundException(`Student with student id ${studentID} does not exist`);

        if (!student.deletedAt)
            throw new NotFoundException(`Student with student id ${studentID} is not deleted`);
        await this.studentRepo.restore(studentID);
        console.log(`Student with student ID: ${studentID} restored successfully!`);
    }
}
