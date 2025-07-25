import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmployeeModule } from './employee/employee.module';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: false,
        logging: false,
        entities: [],
        autoLoadEntities: true,
        keepConnectionAlive: true,
        extra: {
          connectionLimit: 10,
        },
      }),
      inject: [],
    }),
    UsersModule,
    EmployeeModule,
    StudentModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}