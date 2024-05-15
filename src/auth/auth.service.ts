import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { createClient } from "@supabase/supabase-js";

@Injectable()
export class AuthService {
  async getUser(email: string, password: string): Promise<boolean> {
    const supabaseUrl = "https://xsvmwhhwvlncotinzvyi.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzdm13aGh3dmxuY290aW56dnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDI0MTQsImV4cCI6MjAyOTQxODQxNH0.WcSZvdYSbjTCA0pMvsSjpPvZD9toyIuM7OGcdd1JFJk";
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      // Consulta o banco de dados para encontrar o usuário com o email fornecido
      const { data } = await supabase.from("users").select("*").eq("email", email).single();
      if (password === data.password) {
        return true;
      } else {
        throw new Error("Email ou senha incorretos");
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: (error as unknown as Error).message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: (error as unknown as Error).message,
        },
      );
    }
  }
  async create(email: string, password: string): Promise<boolean> {
    const supabaseUrl = "https://xsvmwhhwvlncotinzvyi.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzdm13aGh3dmxuY290aW56dnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDI0MTQsImV4cCI6MjAyOTQxODQxNH0.WcSZvdYSbjTCA0pMvsSjpPvZD9toyIuM7OGcdd1JFJk";
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("users").insert({ email, password });
    if (!error) {
      return true;
    } else {
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
