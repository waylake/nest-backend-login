import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from 'src/database/entity/refreshToken.entity';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  public create(data: Partial<RefreshToken>): RefreshToken {
    return this.refreshTokenRepo.create(data);
  }

  public async addRefreshTokenWithTransaction(
    value: RefreshToken,
  ): Promise<RefreshToken> {
    return this.refreshTokenRepo.save(value);
  }

  public async addRefreshToken(value: RefreshToken): Promise<RefreshToken> {
    return this.refreshTokenRepo.save(value);
  }
}
