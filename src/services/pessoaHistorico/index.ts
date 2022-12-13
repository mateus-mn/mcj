import { useQuery, UseQueryOptions } from 'react-query';

import { PessoaHistorico } from '../../models/PessoaHistorico';
import { api } from '../global/api';
import { createUseGetHistoricoPessoaKey } from './keys';

export const useGetHistoricoPessoa = (
	idPessoa: number | undefined,
	options?: UseQueryOptions<PessoaHistorico[]>,
) => {
	return useQuery<PessoaHistorico[]>(
		createUseGetHistoricoPessoaKey(idPessoa),
		() => api.get(`/pessoaHistorico/listar/${idPessoa}`).then((response) => response.data),
		options,
	);
};
