import { Dispatch, SetStateAction } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { Usuario } from '../../../models/Usuario';

export type ReativarRegistroProps = {
	id: number | undefined;
	modulo: string;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
	) => Promise<QueryObserverResult<Usuario[], unknown>>;
	statusReativarRegistro: boolean;
	setStatusReativarRegistro: Dispatch<SetStateAction<boolean>>;
};
