import { Controller, Get, Post, Delete, Patch, Body, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers(): Promise<UsersDTO[]>{
        return this.usersService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addNewUser(@Body() user : UsersDTO): Promise<UsersDTO>{
        console.log("inside add user controller");
        return this.usersService.addUser(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/count')
    getUserCount(): Promise<number>{
        console.log(`hello`);
        return this.usersService.getUserCount();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/:userID')
    getUserById(@Param() params : {userID: number}): Promise<UsersDTO>{
        return this.usersService.getUserByID(params.userID);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:userID')
    deleteUserByID(@Param() params: { userID: number }, @Request() req): Promise<void>{
        if (req.user.userID == params.userID)
            throw new NotFoundException(`A user cannot delete itself!!!`);
        return this.usersService.deleteUserFromID(params.userID);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:userID/restore')
    recoverDeletedUser(@Param() params : {userID: number}): Promise<void>{
        return this.usersService.recoverDeletedUser(params.userID);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:userID/email')
    changeUserEmail(@Param() params : {userID : number}, @Body() body : {email:string}): Promise<void>{
        return this.usersService.changeUserEmail(params.userID, body.email);
    }
}

//notes keeping app
// sign up page api (name, email, pass(encrypted), email should not exist alr) => create acc
//login(=> crud of notes, abstraction, user should not be able to see other users data)