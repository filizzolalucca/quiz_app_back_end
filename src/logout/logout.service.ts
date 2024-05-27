import { Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";

@Injectable()
export class LogoutService {
  private supabaseUrl = "https://xsvmwhhwvlncotinzvyi.supabase.co";
  private supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzdm13aGh3dmxuY290aW56dnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDI0MTQsImV4cCI6MjAyOTQxODQxNH0.WcSZvdYSbjTCA0pMvsSjpPvZD9toyIuM7OGcdd1JFJk";
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  async getPontuacao(id_materia: number, id_usuario: number, pontuacao: number): Promise<boolean> {
    try {
      // Verificar se existe um registro com id_materia e id_usuario
      const { data, error: selectError } = await this.supabase
        .from("Resposta")
        .select("pontuacao")
        .eq("id_materia", id_materia)
        .eq("id_usuario", id_usuario)
        .single(); // Garantir que apenas um registro é retornado

      if (selectError) {
        if (selectError.code === "PGRST116") {
          // Registro não encontrado
          throw new Error("Usuário ou matéria não encontrados.");
        } else {
          // Outro tipo de erro
          console.error(selectError);
          return false;
        }
      }

      // Comparar pontuação e atualizar se necessário
      if (data.pontuacao < pontuacao) {
        const { error: updateError } = await this.supabase
          .from("Resposta")
          .update({ pontuacao })
          .eq("id_materia", id_materia)
          .eq("id_usuario", id_usuario);

        if (updateError) {
          console.error(updateError);
          return false;
        }
        return true;
      }

      // Se a pontuação no banco é maior ou igual, não atualiza
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}
