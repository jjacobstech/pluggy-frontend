import { Controller, Param, Get, Res, Redirect } from "@nestjs/common";
import { AppService } from "./app.service";
import type { Response } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get(":slug")
  @Redirect()
  async redirect(@Param("slug") slug: string) {
    const url = await this.appService.redirect(slug);

    console.log("URL from database:", url); // Add this to see what you're getting

    return {
      url: url,
      statusCode: 301,
    };
  }
}

// eRukTXR
