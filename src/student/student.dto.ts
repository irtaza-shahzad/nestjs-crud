import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class createStudentDto{

    studentID: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    cgpa: number;

    @IsNotEmpty()
    @IsString()
    department: string;

    createdByUserID: number;

    createdByEmpID: number;
}
