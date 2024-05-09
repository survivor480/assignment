import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './_configs/orm.configs';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HttpModule, TypeOrmModule.forRoot(AppDataSource.options), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
