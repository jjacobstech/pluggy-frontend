import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Res,
} from "@nestjs/common";
import { UrlService } from "./url.service";
import { CreateUrlDto } from "./dto/create-url.dto";
import { UpdateUrlDto } from "./dto/update-url.dto";
import type { Response } from "express";
@Controller("url")
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post("shorten")
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  // @Get(":slug', status: 301")
  // async redirect(@Param("slug") slug: string, @Res() res: Response) {
  //   const url = await this.urlService.findOne(slug);
  //   return res.redirect(url);
  // }

  @Get(":id")
  findAll(@Param("id", ParseIntPipe) id: string) {
    return this.urlService.findAll(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlService.update(+id, updateUrlDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.urlService.remove(+id);
  }
}
