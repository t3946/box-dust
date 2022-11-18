import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export default class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @IsEmail()
  email: string;
}
