import { Module } from "@nestjs/common";
import { UrlService } from "./url.service";
import { UrlController } from "./url.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
  controllers: [UrlController],
  providers: [UrlService],
  imports: [DatabaseModule],
  exports: [UrlService],
})
export class UrlModule {}
