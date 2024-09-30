export interface User {
  id: number;
  name: string;
  email: string;
  tipo_usuario: string;
  phone: number;
  moradores: {
    id: number;
  };
  moradorId: number;
  colaborador: {
    id: number;
    numero_entregas: number;
    avaliacao_media: number;
  };
}