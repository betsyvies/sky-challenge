import {
  IsNumber,
  IsString,
  IsEmail,
  IsNumberString,
  IsOptional,
  ValidateNested,
} from 'class-validator';

class GeoDto {
  @IsNumberString()
  lat: number;

  @IsNumberString()
  lng: number;
}

class AddressDto {
  @IsString()
  street: string;

  @IsString()
  suite: string;

  @IsString()
  city: string;

  @IsString()
  zipcode: number;

  @ValidateNested()
  geo: GeoDto;
}

class CompanyDto {
  @IsString()
  name: string;

  @IsString()
  catchPhrase: string;

  @IsString()
  bs: string;
}

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @ValidateNested()
  address?: AddressDto;

  @IsNumberString()
  phone: number;

  @IsString()
  website: string;

  @ValidateNested()
  company: CompanyDto;
}
