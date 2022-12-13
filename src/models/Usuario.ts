import { Perfil } from './Perfil';

export interface Usuario {
	id: number;
	nome: string;
	login: string;
	perfis: Perfil[];
	ativo: boolean;
}
