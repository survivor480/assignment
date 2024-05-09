import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestUser } from './domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserCreate } from 'src/auth/user_create.command';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(TestUser) private userRepository:Repository<TestUser>
  ){}

  async create(user_details: UserCreate): Promise<TestUser> {
    // Hashing the password in this line
    user_details.password = await bcrypt.hash(user_details.password, 10);
    
    return await this.userRepository.save(user_details);
  }


  async findOne(username: string): Promise<TestUser> {
    // This is to find the user
    const user_instance = await this.userRepository.findOne({where: {user_name: username , delete_flag:false}});

    if(!user_instance) throw {error: 'No such user exists', type: 'custom'};

    return user_instance;
  }

  async checkIfUserExists(username: string): Promise<TestUser> {
    return await this.userRepository.findOne({where: {user_name: username}});
  }

  async getUser(username: string): Promise<TestUser> {
    return await this.userRepository.findOne({where: {user_name: username}});
  }
}