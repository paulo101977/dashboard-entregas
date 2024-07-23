export enum StatusEntregaEnum {
  ENTREGUE = "ENTREGUE",
  PENDENTE = "PENDENTE",
  INSUCESSO = "INSUCESSO",
}

export interface AgrupamentoPorNomeEntregaModel {
  total: number;
  nome: string;
  quantidadeEntregas: number;
}

export interface ListagemEntregasModel {
  id: string;
  documento: string;
  motorista: string;
  status_entrega: StatusEntregaEnum;
}

export interface AgrupamentoPorBairroEntregaModel {
  total: number;
  quantidadeEntregas: number;
  bairro: string;
}


export interface DataModel {
    id: string;
    documento: string;
    motorista: {
      nome: string;
    },
    cliente_origem: {
      nome: string;
      endereco: string;
      bairro: string;
      cidade: string;
    },
    cliente_destino: {
      nome: string;
      endereco: string;
      bairro: string;
      cidade: string;
    },
    status_entrega: StatusEntregaEnum;
}
