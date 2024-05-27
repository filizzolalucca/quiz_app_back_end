import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { QuestionsController } from "./questions/questions.controller";
import { QuestionsService } from "./questions/questions.service";
import { LogoutService } from "./logout/logout.service";
import { LogoutController } from "./logout/logout.controller";

@Module({
  imports: [],
  controllers: [AppController, AuthController, QuestionsController, LogoutController],
  providers: [AppService, AuthService, QuestionsService, LogoutService],
})
export class AppModule {}
