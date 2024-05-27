import { Body, Controller, Post } from "@nestjs/common";
import { LogoutService } from "./logout.service";
import { Logout } from "./types";

@Controller("logout")
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Post("/logout")
  async getPontuacao(@Body() logout: Logout): Promise<boolean> {
    return await this.logoutService.getPontuacao(logout.id_materia, logout.id_usuario, logout.pontuacao);
  }
}
