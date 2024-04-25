import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsOptional()
  @IsIn(['Bronze', 'Gold', 'Platinum'])
  membershipTier?: string;

  @IsString()
  @IsOptional()
  contactNumber?: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  displayName?: string;

  @IsOptional()
  @IsIn(['Bronze', 'Gold', 'Platinum'])
  membershipTier?: string;

  @IsString()
  @IsOptional()
  contactNumber?: string;
}
