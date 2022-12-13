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
		() => api.get(`/grupoHistorico/listar/${idGrupo}`).then((response) => response.data),
		options,
	);
};
