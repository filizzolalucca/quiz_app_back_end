import { Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";

@Injectable()
export class storeDataService {
  private supabaseUrl = "https://xsvmwhhwvlncotinzvyi.supabase.co";
  private supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzdm13aGh3dmxuY290aW56dnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDI0MTQsImV4cCI6MjAyOTQxODQxNH0.WcSZvdYSbjTCA0pMvsSjpPvZD9toyIuM7OGcdd1JFJk";
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  async getPontuacao(id_materia: number, id_usuario: number, pontuacao: number): Promise<{ valido: boolean }> {
    try {
      // Verificar se existe um registro com id_materia e id_usuario
      const { error: selectError } = await this.supabase
        .from("Resposta")
        .select("id_usuario, id_materia, pontuacao, numero_questionario_realizado, data")
        .eq("id_usuario", id_usuario)
        .eq("id_materia", id_materia)
        .order("data", { ascending: false }) // Ordena por data mais recente
        .limit(1) // Garante que apenas o registro mais recente é retornado
        .single(); // Garantir que apenas um registro é retornado

      if (selectError) {
        if (selectError.code === "PGRST116") {
          // Registro não encontrado
          throw new Error("Usuário ou matéria não encontrados.");
        } else {
          // Outro tipo de erro
          console.error(selectError);
          return { valido: false };
        }
      }
      const { error: updateError } = await this.supabase
        .from("Resposta")
        .update({ pontuacao })
        .eq("id_materia", id_materia)
        .eq("id_usuario", id_usuario)
        .order("data", { ascending: false }) // Ordena por data mais recente
        .limit(1) // Garante que apenas o registro mais recente é retornado
        .single();

      if (updateError) {
        console.error(updateError);
        return { valido: false };
      }
      return { valido: true };
    } catch (error) {
      console.error(error.message);
      return { valido: false };
    }
  }
}
