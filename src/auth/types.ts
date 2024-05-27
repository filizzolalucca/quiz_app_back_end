export type AuthenticatedUser = {
  id: string | null;
  nome: string | null;
  email: string | null;
};
export type CreatedUser = {
  created: string | null;
};
export class CreateUser {
  email: string;
  password: string;
  nome: string;
}
export class EditUser {
  id_usuario: number;
  nome: string;
}

export type EditName = {
  edited: boolean | null;
};
