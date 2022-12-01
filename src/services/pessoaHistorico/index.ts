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
		() =>
			fetch(`${api.href}pessoaHistorico/listar/${idPessoa}`, {
				mode: 'cors',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					Authorization: 'Bearer ' + sessionStorage.getItem('tokenUsuario'),
				},
				method: 'GET',
			}).then((response) => response.json()),
		options,
	);
};
