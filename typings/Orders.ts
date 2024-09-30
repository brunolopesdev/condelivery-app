export interface Orders {
  codigo_confirmacao: string;
  data_entrega: string;
  id: number;
  plataforma: string[];
  status: string;
  complemento: string;
  colaborador?: {
    id: number;
  };
  morador: {
    id: number;
  };
}
