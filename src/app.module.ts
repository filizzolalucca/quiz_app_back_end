import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { QuestionsController } from "./questions/questions.controller";
import { QuestionsService } from "./questions/questions.service";

@Module({
  imports: [],
  controllers: [AppController, AuthController, QuestionsController],
  providers: [AppService, AuthService, QuestionsService],
})
export class AppModule {}
