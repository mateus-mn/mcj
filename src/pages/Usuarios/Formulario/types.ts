import { Dispatch, SetStateAction } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { Usuario } from '../../../models/Usuario';

export type FormularioProps = {
	statusFormulario: boolean;
	setStatusFormulario: Dispatch<SetStateAction<boolean>>;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
	) => Promise<QueryObserverResult<Usuario[], unknown>>;
	usuario: Usuario | undefined;
	setUsuario: Dispatch<SetStateAction<Usuario | undefined>>;
};

export type UsuarioForm = {
	nome: string;
	login: string;
	senha?: string;
	perfis: string[];
};
