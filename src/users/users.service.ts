import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UsersDTO } from './users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersRepo: Repository<Users>) { }
    
    async getAllUsers(): Promise<UsersDTO[]>{
        return await this.usersRepo.find();
    }

    async addUser(user: UsersDTO): Promise<UsersDTO>{
        const newUser: (UsersDTO | null) = await this.usersRepo.create(user);
        console.log("inside addUser service");
        console.log(newUser);
        if (!newUser)
            throw new NotFoundException(`errorrrrr`);

        return await this.usersRepo.save(newUser);
    }

    async getUserByID(userID: number): Promise<UsersDTO>{
        const user: (UsersDTO | null) = await this.usersRepo.findOneBy({userID});

        if (!user)
            throw new NotFoundException();

        return user;
    }

    async getUserCount(): Promise<number>{
        const userCount: (number | null) = await this.usersRepo.count();
        console.log(`in user count service`);
        if (!userCount)
            throw new NotFoundException(`There was an error in fetching user count`);
        return userCount;
    }

    async deleteUserFromID(userID: number):Promise<void> {
        const user: (UsersDTO | null) = await this.usersRepo.findOneBy({ userID });
        if (!user)
            throw new NotFoundException(`User with id: ${userID} does not exist`);
        console.log("user deleted");
        await this.usersRepo.softDelete({ userID });
    }

    async recoverDeletedUser(userID: number): Promise<void>{
        const user = await this.usersRepo.findOne({ where: { userID }, withDeleted: true });

        if (!user)
            throw new NotFoundException(`User with user id ${userID} does not exist`);

        if (!user.deletedAt)
            throw new NotFoundException(`User with user id ${userID} is not deleted`);
        await this.usersRepo.restore(userID);
        console.log(`User with user ID: ${userID} restored successfully!`);
    }

    async changeUserEmail(userID: number, email: string): Promise<void>{
        const user: (UsersDTO | null) = await this.usersRepo.findOneBy({ userID });
        if (!user)
            throw new NotFoundException(`User with user ID: ${userID} does not exist`);
        await this.usersRepo.update({ userID }, { email });
    }

    //for auth
    async findUserByUsername(username: string): Promise<UsersDTO | null>{
        return this.usersRepo.findOne({ where: { username } });
    }
}
