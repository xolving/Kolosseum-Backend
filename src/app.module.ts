import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from 'src/config/db.config';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { ConfigsModule } from './configs/configs.module';
import { HistoryModule } from './history/history.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BoardModule,
    HistoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: typeOrmConfig().host,
      port: typeOrmConfig().port,
      username: typeOrmConfig().username,
      password: typeOrmConfig().password,
      database: typeOrmConfig().name,
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
