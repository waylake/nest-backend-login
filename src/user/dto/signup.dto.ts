import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'name',
    default: 'TESTER',
    required: true,
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'email',
    default: 'test2@gmail.com',
    required: true,
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'company',
    default: 'company',
    required: true,
  })
  @IsString()
  company!: string;

  @ApiProperty({
    description: 'job',
    default: 'job',
    required: true,
  })
  @IsString()
  job: string;

  @ApiProperty({
    description: 'nickname',
    default: 'nickname',
    required: true,
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    description: 'password',
    default: 'password',
    required: true,
  })
  @IsString()
  password!: string;
}
