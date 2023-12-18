import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RefreshTokenRepository } from 'src/core/repository/refresh-token.repository';
import { Repository, DataSource } from 'typeorm';
import { Token } from '../core/interfaces';
import { SignupDto, LoginDto } from './dto';
import {
  generatePassword,
  // validatePassword,
  generateRandom,
  validatePassword,
  generateToken,
  // numericRandom,
} from '../core';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private dataSource: DataSource,
  ) {}

  public async signup(payload: SignupDto): Promise<Token> {
    const { name, email, company, job, nickname, password } = payload;

    const isEmailExist: number = await this.userRepository.count({
      where: { email },
    });
    if (isEmailExist) {
      throw new Error('USER_EMAIL_CONFLICT');
    }

    const isNicknameExist: number = await this.userRepository.count({
      where: { nickname },
    });
    if (isNicknameExist) {
      throw new Error('USER_NICKNAME_CONFLICT');
    }

    const hashedPassword = await generatePassword(password);

    const token: Token = {
      accessToken: '',
      refreshToken: '',
    };

    try {
      const addUserValue = this.userRepository.create({
        name,
        email,
        company,
        job,
        nickname,
        password: hashedPassword,
      });
      const addUserResult = await this.userRepository.save(addUserValue);
      if (!addUserResult) {
        throw new Error('AFFECTED_ROWS_ERROR');
      }

      const refreshToken = generateRandom(32);
      const expiredAt = new Date(Date.now() + 3600 * 1000 * 24);
      const addRefreshTokenValue = this.refreshTokenRepository.create({
        userId: addUserResult.id,
        refreshToken: refreshToken,
        expiredAt: expiredAt,
        isBlocked: false,
      });
      const addRefreshToken =
        await this.refreshTokenRepository.addRefreshToken(addRefreshTokenValue);
      if (!addRefreshToken) {
        throw new Error('AFFECTED_ROWS_ERROR');
      }
      token.tokenPayload = {
        id: addUserResult.id,
        email: addUserResult.email,
      };
      token.accessToken = generateToken(token.tokenPayload);
      token.refreshToken = refreshToken;
    } catch (err) {
      throw err;
    }

    return token;
  }

  public async login(payload: LoginDto): Promise<Token> {
    const { email, password } = payload;

    const user: User | undefined = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    const comparePassword = await validatePassword(password, user.password);
    if (!comparePassword) {
      throw new Error('USER_NOT_FOUND');
    }

    const token: Token = {
      accessToken: '',
      refreshToken: '',
    };

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const refreshToken = generateRandom(32);
      const expiredAt = new Date(Date.now() + 3600 * 1000 * 24);
      const addRefreshTokenValue = this.refreshTokenRepository.create({
        userId: user.id,
        refreshToken,
        isBlocked: false,
        expiredAt,
      });
      const addRefreshToken =
        await this.refreshTokenRepository.addRefreshToken(addRefreshTokenValue);
      if (!addRefreshToken) {
        throw new Error('AFFECTED_ROWS_ERROR');
      }

      token.tokenPayload = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      token.accessToken = generateToken(token.tokenPayload);
      token.refreshToken = refreshToken;

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    return token;
  }

  // return hello world to json
  public async helloWorld(): Promise<string> {
    return 'hello world';
  }
}
