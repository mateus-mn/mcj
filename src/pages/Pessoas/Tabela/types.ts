import { Dispatch, SetStateAction } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { Grupo } from '../../../models/Grupo';
import { Pessoa } from '../../../models/Pessoa';

export type TabelaProps = {
	pessoas: Pessoa[] | undefined;
	pessoa: Pessoa | undefined;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
	) => Promise<QueryObserverResult<Pessoa[], unknown>>;
	setPessoa: Dispatch<SetStateAction<Pessoa | undefined>>;
	setStatusFormulario: Dispatch<SetStateAction<boolean>>;
};

export type ColunasTabela = {
	id: number;
	nome: string;
	descricaoSexo: string;
	dataNascimento: string;
	ativo: boolean;
};
