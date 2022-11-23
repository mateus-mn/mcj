import { Dispatch, SetStateAction } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { Grupo } from '../../../models/Grupo';

export type FormularioProps = {
	statusFormulario: boolean;
	setStatusFormulario: Dispatch<SetStateAction<boolean>>;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
	) => Promise<QueryObserverResult<Grupo[], unknown>>;
	grupo: Grupo | undefined;
	setGrupo: Dispatch<SetStateAction<Grupo | undefined>>;
};

export type GrupoForm = {
	numero: number;
	nome: string;
};
