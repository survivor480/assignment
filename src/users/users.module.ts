import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUser } from './domain/entities/user.entity';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestUser]),
    forwardRef(() => AuthModule)
  ],
  providers: [
    UsersService
  ],
  exports: [UsersService]
})

export class UsersModule {}
