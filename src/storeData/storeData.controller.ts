import { Body, Controller, Post } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { storeDataService } from "./storeData.service";
import { StoreData } from "./types";

@Controller("storeData")
export class StoreDataController {
  constructor(private readonly storeDataService: storeDataService) {}

  @Post("/storeData")
  async getPontuacao(@Body() storeData: StoreData): Promise<{ valido: boolean }> {
    return await this.storeDataService.getPontuacao(storeData.id_materia, storeData.id_usuario, storeData.pontuacao);
  }
}
