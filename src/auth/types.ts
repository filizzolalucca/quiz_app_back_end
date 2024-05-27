export type AuthenticatedUser = {
  id: string | null;
};
export type CreatedUser = {
  created: string | null;
};
export class CreateUser {
  email: string;
  password: string;
  nome: string;
}
