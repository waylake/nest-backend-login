import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'email',
    default: 'test2@gmail.com',
    required: true,
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'password',
    default: 'password',
    required: true,
  })
  @IsString()
  password!: string;
}
