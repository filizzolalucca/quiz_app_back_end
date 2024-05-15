import { Controller, Post } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
export class CreateQuestions {
  questions: string;
  id: string;
}
@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post("/questions")
  async getQuestionsWithAnswers(): Promise<{ question: string; answers: string[] }[]> {
    return await this.questionsService.getQuestionsAndAnswers();
  }
}
