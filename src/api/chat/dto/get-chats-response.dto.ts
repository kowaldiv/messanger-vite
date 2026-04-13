import { Type } from "class-transformer";
import {
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsIn,
} from "class-validator";

// Краткая информация об участнике (для отображения)
export class ParticipantBriefDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}

// Тип чата
const chatTypes = ["private", "group", "channel"] as const;
type ChatType = (typeof chatTypes)[number];

// Основной DTO чата
export class ChatDto {
  @IsString()
  id!: string; // уникальный ID чата

  @IsIn(chatTypes)
  type!: ChatType; // тип чата

  @IsString()
  title!: string; // название чата (или имя собеседника)

  @IsString()
  @IsOptional()
  avatar?: string; // URL аватара чата

  @IsString()
  @IsOptional()
  lastMessage?: string; // текст последнего сообщения

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  lastMessageAt?: Date; // когда было последнее сообщение

  @IsNumber()
  unreadCount: number = 0; // количество непрочитанных сообщений

  @IsBoolean()
  isPinned: boolean = false; // закреплён ли чат

  @IsBoolean()
  isArchived: boolean = false; // архивирован ли

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipantBriefDto)
  @IsOptional()
  participants?: ParticipantBriefDto[]; // список участников (для группы/канала)

  // Для личного чата можно хранить второго участника отдельно
  @ValidateNested()
  @Type(() => ParticipantBriefDto)
  @IsOptional()
  otherParticipant?: ParticipantBriefDto;
}
export class ChatsDTO {
  @IsArray()
  @ValidateNested({ each: true }) // валидирует каждый элемент массива
  @Type(() => ChatDto) // преобразует простые объекты в экземпляры DeviceDto
  devices!: ChatDto[];
}
