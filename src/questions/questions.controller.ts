import { Body, Controller, Post } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { Questionario } from "./types";
@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post("/questions")
  async getQuestionsWithAnswers(@Body() questionario: Questionario): Promise<{
    ajuda: string;
    questions: { question: string; answers: { resposta: string; correta: boolean }[] }[];
  }> {
    return await this.questionsService.getQuestionsAndAnswers(questionario.id_materia, questionario.id_usuario);
  }
}
