import { useQuery, UseQueryOptions } from 'react-query';
import { GrupoHistorico } from '../../models/GrupoHistorico';
import { api } from '../global/api';
import { createUseGetHistoricoGrupoKey } from './keys';

export const useGetHistoricoGrupo = (
	idGrupo: number | undefined,
	options?: UseQueryOptions<GrupoHistorico[]>,
) => {
	return useQuery<GrupoHistorico[]>(
		createUseGetHistoricoGrupoKey(idGrupo),
		() =>
			fetch(`${api.href}grupoHistorico/listar/${idGrupo}`, {
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
