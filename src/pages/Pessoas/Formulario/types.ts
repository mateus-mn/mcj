import { Dispatch, SetStateAction } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { Pessoa } from '../../../models/Pessoa';

export type FormularioProps = {
	statusFormulario: boolean;
	setStatusFormulario: Dispatch<SetStateAction<boolean>>;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
	) => Promise<QueryObserverResult<Pessoa[], unknown>>;
	pessoa: Pessoa | undefined;
	setPessoa: Dispatch<SetStateAction<Pessoa | undefined>>;
};

export type PessoaForm = {
	nome: string;
	sexo: string;
	dataNascimento: string;
	email: string;
	celular: string;
};
