import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { QuestionsController } from "./questions/questions.controller";
import { QuestionsService } from "./questions/questions.service";
import { storeDataService } from "./storeData/storeData.service";
import { StoreDataController } from "./storeData/storeData.controller";

@Module({
  imports: [],
  controllers: [AppController, AuthController, QuestionsController, StoreDataController],
  providers: [AppService, AuthService, QuestionsService, storeDataService],
})
export class AppModule {}
