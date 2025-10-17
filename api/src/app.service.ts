import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UrlService } from "./url/url.service";

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly urlService: UrlService
  ) {}
  getHello(): string {
    console.log(this.configService.getOrThrow<string>("JWT_SECRET"));
    return "Hello World!";
  }
  async redirect(slug: string) {
    return await this.urlService.findOne(slug);
  }
}
