import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";

@Injectable()
export class QuestionsService {
  private supabase = createClient(
    "https://xsvmwhhwvlncotinzvyi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzdm13aGh3dmxuY290aW56dnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDI0MTQsImV4cCI6MjAyOTQxODQxNH0.WcSZvdYSbjTCA0pMvsSjpPvZD9toyIuM7OGcdd1JFJk",
  );

  async getQuestionsAndAnswers(
    id_materia: number,
    id_usuario: number,
  ): Promise<{
    numero_questionario_realizado: number;
    questions: { question: string; answers: { resposta: string; correta: boolean }[] }[];
  }> {
    try {
      // Verifica se existe uma resposta para o usuário e a matéria fornecida
      const { data: respostaData, error: respostaError } = await this.supabase
        .from("Resposta")
        .select("id_usuario, id_materia, pontuacao, numero_questionario_realizado, data")
        .eq("id_usuario", id_usuario)
        .eq("id_materia", id_materia)
        .order("data", { ascending: false }) // Ordena por data mais recente
        .limit(1) // Garante que apenas o registro mais recente é retornado
        .single();

      if (respostaError && respostaError.code !== "PGRST116") {
        throw new Error("Erro ao buscar a resposta: " + respostaError.message);
      }

      let numero_questionario_realizado: number;

      if (!respostaData) {
        // Se a resposta não existe, cria uma nova com pontuação 0 e numero_questionario_realizado 1
        const { error: newRespostaError } = await this.supabase
          .from("Resposta")
          .insert({ id_usuario, id_materia, pontuacao: 0, numero_questionario_realizado: 1 })
          .single();

        if (newRespostaError) {
          throw new Error("Erro ao criar a resposta: " + newRespostaError.message);
        }
        numero_questionario_realizado = 1;
      } else {
        // Se a resposta já existe, incrementa o número do questionário
        numero_questionario_realizado = respostaData.numero_questionario_realizado;

        // Incrementa o número do questionário seguindo a lógica desejada
        if (numero_questionario_realizado === 4) {
          numero_questionario_realizado = 1;
        } else {
          numero_questionario_realizado += 1;
        }

        const { error: updateRespostaError } = await this.supabase
          .from("Resposta")
          .insert({ id_usuario, id_materia, pontuacao: 0, numero_questionario_realizado })
          .single();

        if (updateRespostaError) {
          throw new Error("Erro ao atualizar a resposta: " + updateRespostaError.message);
        }
      }
      const id_questionario: number = numero_questionario_realizado;

      // Busca as questões com base na matéria e no questionário realizado
      const { data: questionsData, error: questionsError } = await this.supabase
        .from("Questao")
        .select("id, questoes")
        .eq("id_materia", id_materia)
        .eq("id_questionario", id_questionario);

      if (questionsError) {
        throw new Error("Erro ao buscar as questões: " + questionsError.message);
      }

      if (!questionsData || questionsData.length === 0) {
        throw new Error("Nenhuma questão encontrada");
      }

      // Extrai os IDs das questões
      const questionIds = questionsData.map((questoes) => questoes.id);

      // Busca as respostas correspondentes às questões encontradas
      const { data: answersData, error: answersError } = await this.supabase
        .from("Alternativa")
        .select("id_questoes, respostas, respostacorreta")
        .in("id_questoes", questionIds);

      if (answersError) {
        throw new Error("Erro ao buscar as respostas: " + answersError.message);
      }

      // Organiza as respostas por questão
      const questionAnswerPairs = questionsData.map((questao) => {
        const answers = answersData
          .filter((resposta) => resposta.id_questoes === questao.id)
          .map((resposta) => {
            return {
              resposta: resposta.respostas,
              correta: resposta.respostacorreta,
            };
          });
        return { question: questao.questoes, answers };
      });

      return {
        numero_questionario_realizado,
        questions: questionAnswerPairs,
      };
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
