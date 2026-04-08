import { IsString } from "class-validator";

export class UserInfoDto {
  @IsString()
  userId!: string;

  @IsString()
  userName!: string;

  @IsString()
  firshName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  avatar!: string;
}
