import { Transform } from 'class-transformer';
import {
  IsAlphanumeric,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsAlphanumeric()
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'site can only contain letters, numbers, and underscores',
  })
  @Transform(({ value }) => String(value).toLocaleLowerCase())
  site: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsAlphanumeric()
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'username can only contain letters, numbers, and underscores',
  })
  @Transform(({ value }) => String(value).toLocaleLowerCase())
  username: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minUppercase: 0,
    minSymbols: 0,
  })
  password: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = false;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}
