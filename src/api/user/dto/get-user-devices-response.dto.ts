import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";

export class DeviceDto {
  @IsString()
  name!: string;

  @IsString()
  from!: string;
}

export class DevicesDTO {
  @IsArray()
  @ValidateNested({ each: true }) // валидирует каждый элемент массива
  @Type(() => DeviceDto) // преобразует простые объекты в экземпляры DeviceDto
  devices!: DeviceDto[];
}
