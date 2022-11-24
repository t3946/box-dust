import { IsEmail, MaxLength, MinLength } from 'class-validator';

export default class UpdateUserDto {
  @MaxLength(32)
  name?: string;

  @MinLength(6)
  @MaxLength(32)
  password?: string;

  @IsEmail()
  email?: string;

  confirmed?: boolean;
  balance?: number;
  partnership_id?: number;
  avatar?: string;
}
