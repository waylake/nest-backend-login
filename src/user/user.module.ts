import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RefreshTokenRepository } from 'src/core/repository/refresh-token.repository';
import { RefreshToken } from 'src/database/entity/refreshToken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  controllers: [UserController],
  providers: [UserService, RefreshTokenRepository],
})
export class UserModule {}
