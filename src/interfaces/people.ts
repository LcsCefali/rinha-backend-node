export interface ICreatePeopleModel {
  id: string;
  apelido: string;
  nome: string;
  nascimento: string;
  stack: string[];
}

export type People = {
  id: string;
  apelido: string;
  nome: string;
  nascimento: string;
  stack: string;
  all: string;
}