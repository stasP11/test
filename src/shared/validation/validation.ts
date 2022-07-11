import {
  IsNotEmpty,
  Min,
  Max,
  IsAlphanumeric,
  Matches,
  IsString,
  IsBoolean,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @Matches(`(?=.*[a-zA-Z])(?=.*[0-9])`)
  password;
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @Min(4)
  @Max(130)
  age: number;

  @IsNotEmpty()
  @IsBoolean()
  isDeleted: boolean;
}
