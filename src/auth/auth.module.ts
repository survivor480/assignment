import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    // BoatsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '120000s'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}