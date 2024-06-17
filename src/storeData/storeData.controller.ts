import { Body, Controller, Post } from "@nestjs/common";
import { storeDataService } from "./storeData.service";
import { StoreData } from "./types";

@Controller("storeData")
export class StoreDataController {
  constructor(private readonly storeDataService: storeDataService) {}

  @Post("/storeData")
  async getPontuacao(@Body() storeData: StoreData): Promise<boolean> {
    return await this.storeDataService.getPontuacao(storeData.id_materia, storeData.id_usuario, storeData.pontuacao);
  }
}
