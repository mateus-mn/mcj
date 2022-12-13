import { Dispatch, SetStateAction } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { Perfil } from '../../../models/Perfil';
import { Usuario } from '../../../models/Usuario';

export type TabelaProps = {
	usuarios: Usuario[] | undefined;
	usuario: Usuario | undefined;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
	) => Promise<QueryObserverResult<Usuario[], unknown>>;
	setUsuario: Dispatch<SetStateAction<Usuario | undefined>>;
	setStatusFormulario: Dispatch<SetStateAction<boolean>>;
};

export type ColunasTabela = {
	id: number;
	nome: string;
	login: string;
	perfis: Perfil[];
	ativo: boolean;
};
