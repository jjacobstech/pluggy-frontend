import { HttpException, Injectable } from "@nestjs/common";
import { CreateUrlDto } from "./dto/create-url.dto";
import { UpdateUrlDto } from "./dto/update-url.dto";
import { InputUrlDto } from "./dto/input-url.dto";
import { DatabaseService } from "src/database/database.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UrlService {
  private readonly app_url: string | undefined;
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService
  ) {
    this.app_url = `${this.configService.get<string>("APP_URL")}`;
  }

  createRandomString(length) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async create(createUrlDto: CreateUrlDto) {
    const shortUrl =
      createUrlDto.short_url != null
        ? createUrlDto.short_url
        : this.createRandomString(10);
    let url = createUrlDto.url;
    if (!url.includes("https://")) {
      url = `https://${url}`;
    }

    const exists = await this.databaseService.links.findFirst({
      where: {
        url: url,
      },
    });

    if (exists) {
      throw new HttpException("Link already exists", 400);
    }

    const link = await this.databaseService.links.create({
      data: {
        url: url,
        shortUrl: shortUrl,
      },
    });

    if (!link) {
      throw new HttpException("Link not created", 500);
    }
    return {
      shortUrl: `${this.app_url}/${link.shortUrl}`,
    };
  }

  findAll(id?: number) {
    const links = this.databaseService.links.findMany({
      where: {
        user_id: id,
      },
      orderBy: {
        id: "desc",
        createdAt: "desc",
      },
    });

    return links;
  }

  async findOne(slug: string) {
    const link = await this.databaseService.links.findUnique({
      where: {
        shortUrl: slug,
      },
    });

    if (!link) {
      throw new HttpException("Page not found", 404);
    }

    console.log("====================================");
    console.log(link);
    console.log("====================================");

    return `${link.url}`;
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    const link = this.databaseService.links.update({
      where: {
        id,
      },
      data: updateUrlDto,
    });

    return link;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
