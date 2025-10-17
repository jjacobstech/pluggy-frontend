import {
  IsNotEmpty,
  IsUrl,
  IsString,
  IsOptional,
  IsNumber,
} from "class-validator";
import { Prisma } from "@prisma/client";
export class CreateUrlDto {
  @IsNotEmpty()
  @IsUrl()
  @IsString()
  url: string;

  @IsUrl()
  @IsOptional()
  @IsString()
  short_url: string;

  @IsNumber()
  @IsOptional()
  user_id: number;
}
