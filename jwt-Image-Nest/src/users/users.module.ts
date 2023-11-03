import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from './schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports:[
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports:[
  ]
})
export class UsersModule {}