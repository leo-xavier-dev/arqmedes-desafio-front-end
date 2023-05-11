export interface Users {
  id: number;
  nome: string,
  usuario: string;
  senha: string;
  cpf: string;
  profissao: string;
  dataNascimento: string;
  estadoCivil: string;
  cidade: string;
  uf: string;
}

export interface Estados {
  nome: string;
  sigla: string;
}

export interface Cidades {
  sigla: string,
  nome: string,
  cidades: string[];
}

export interface EstadoCivil {
  id: number,
  descricao: string;
}