import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";

@Injectable()
export class QuestionsService {
  async getQuestionsAndAnswers(): Promise<{ question: string; answers: string[] }[]> {
    const supabaseUrl = "https://xsvmwhhwvlncotinzvyi.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzdm13aGh3dmxuY290aW56dnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDI0MTQsImV4cCI6MjAyOTQxODQxNH0.WcSZvdYSbjTCA0pMvsSjpPvZD9toyIuM7OGcdd1JFJk";
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      // Busca as 10 questões
      const { data: questionsData, error: questionsError } = await supabase
        .from("Questao")
        .select("id, questoes")
        .limit(5);

      if (questionsError) {
        throw new Error("Erro ao buscar as questões: " + questionsError.message);
      }

      if (!questionsData || questionsData.length === 0) {
        throw new Error("Nenhuma questão encontrada");
      }

      // Extrai os IDs das questões
      const questionIds = questionsData.map((questoes) => questoes.id);

      // Busca as respostas correspondentes às questões encontradas
      const { data: answersData, error: answersError } = await supabase
        .from("Alternativa")
        .select("id_questoes, respostas")
        .in("id_questoes", questionIds);

      if (answersError) {
        throw new Error("Erro ao buscar as respostas: " + answersError.message);
      }

      // Organiza as respostas por questão
      const questionAnswerPairs = questionsData.map((questao) => {
        const answers = answersData
          .filter((resposta) => resposta.id_questoes === questao.id)
          .map((resposta) => resposta.respostas);
        return { question: questao.questoes, answers };
      });

      return questionAnswerPairs;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error.message,
        },
      );
    }
  }
}
