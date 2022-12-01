import { Dispatch, SetStateAction } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { Pessoa } from '../../../models/Pessoa';

export type DesativarRegistroProps = {
	id: number | undefined;
	modulo: string;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
	) => Promise<QueryObserverResult<Pessoa[], unknown>>;
	statusDesativarRegistro: boolean;
	setStatusDesativarRegistro: Dispatch<SetStateAction<boolean>>;
};
