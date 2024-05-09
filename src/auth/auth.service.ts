import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserCreate } from './user_create.command';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string, expiry_time_in_minutes?: number): Promise<string> {
    // Find the user with his username
    const user = await this.usersService.findOne(username);

    // Check if the user entered a valid password or not and give valid error.
    if (!(await bcrypt.compare(pass, user.password))) throw {error: 'Please Check your Username and Password', type: 'custom'}

    // If expiry date is provided, we go ahead
    if(expiry_time_in_minutes !== undefined) return this.createToken(user.user_id, user.user_name, expiry_time_in_minutes);

    return this.createToken(user.user_id, user.user_name);
  }

  async create(user_details: UserCreate){
    // Check if user exists
    const user_instance = await this.usersService.checkIfUserExists(user_details.user_name);

    if(user_instance) throw {error: 'User Already Exists', type: 'custom'};

    // Creation of user occurs here
    const user = await this.usersService.create(user_details);

    // In case of failure in user creation, this statement executes.
    if(!user) throw {error: 'User Creation Failed', type: 'custom'}
    
    return user;
  }

  async createToken(user_id: string, user_name: string, expiry_time_in_minutes?: number) {
    const currentDate = new Date();

    // This is setting the expiry time.
    const expiry_time = new Date(currentDate.setMinutes(currentDate.getMinutes() + (expiry_time_in_minutes ?? 15)));

    let payload = {};
  
    payload = { sub: user_id, username: user_name, expiry: expiry_time };

    return await this.jwtService.signAsync(payload)
  }

  async decode(access_token:string){
    let actual_token = access_token.split(' ')[1];

    return await this.jwtService.decode(actual_token);
  }

  async getUserDetails(user_id: string){
    return await this.usersService.getUser(user_id);
  }
}