import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsModule } from 'src/configs/configs.module';
import jwtConfig from 'src/configs/jwt.config';
import { User } from 'src/user/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConfig().jwtToken,
      signOptions: {
        expiresIn: '3600s',
      },
    }),
    ConfigsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
