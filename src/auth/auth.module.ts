import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from 'src/config/db.config';
import { ConfigsModule } from 'src/configs/configs.module';
import { User } from 'src/user/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: typeOrmConfig().password,
      signOptions: { expiresIn: '60s' },
    }),
    ConfigsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
