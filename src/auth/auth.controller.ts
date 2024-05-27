import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUser } from "./types";
import { AuthenticatedUser, CreatedUser } from "./types";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signinv2")
  async getUserV2(@Body() createUser: CreateUser): Promise<AuthenticatedUser> {
    return await this.authService.getUser(createUser.email, createUser.password);
  }
  @Post("/singup")
  async create(@Body() createUser: CreateUser): Promise<CreatedUser> {
    return await this.authService.create(createUser.email, createUser.password, createUser.nome);
  }
}
