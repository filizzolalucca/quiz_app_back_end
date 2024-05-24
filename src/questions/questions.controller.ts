import { Body, Controller, Post } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { Questionario } from "./types";
export class CreateQuestions {
  questions: string;
  id: string;
}
@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post("/questions")
  async getQuestionsWithAnswers(
    @Body() questionario: Questionario,
  ): Promise<{ question: string; answers: { resposta: string; correta: boolean }[] }[]> {
    return await this.questionsService.getQuestionsAndAnswers(questionario.id_materia);
  }
}
