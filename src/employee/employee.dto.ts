import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createEmployeeDto{

    employeeID: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    department: string;

    createdByUserID: number;
}
