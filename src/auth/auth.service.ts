import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { createClient } from "@supabase/supabase-js";
import * as bcrypt from "bcryptjs";
import { AuthenticatedUser, CreatedUser } from "./types";

@Injectable()
export class AuthService {
  async getUser(email: string, password: string): Promise<AuthenticatedUser> {
    const supabaseUrl = "https://xsvmwhhwvlncotinzvyi.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzdm13aGh3dmxuY290aW56dnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDI0MTQsImV4cCI6MjAyOTQxODQxNH0.WcSZvdYSbjTCA0pMvsSjpPvZD9toyIuM7OGcdd1JFJk";
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      // Consulta o banco de dados para encontrar o usuário com o email fornecido
      const { data } = await supabase.from("users").select("*").eq("email", email).single();
      if (!data) {
        return { id: null };
      } else {
        const isValidPassword = await bcrypt.compare(password, data.password);
        if (isValidPassword) {
          return { id: data.id };
        }
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
  async create(email: string, password: string, nome: string): Promise<CreatedUser> {
    const supabaseUrl = "https://xsvmwhhwvlncotinzvyi.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzdm13aGh3dmxuY290aW56dnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDI0MTQsImV4cCI6MjAyOTQxODQxNH0.WcSZvdYSbjTCA0pMvsSjpPvZD9toyIuM7OGcdd1JFJk";
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("users").insert({ email, password: bcrypt.hashSync(password, 10), nome });
    if (!error) {
      return { created: "true" };
    } else {
      return { created: "false" };
    }
  }
}
