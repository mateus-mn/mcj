import { useQuery, UseQueryOptions } from 'react-query';
import { Perfil } from '../../models/Perfil';

import { api } from '../global/api';
import { createUseGetDetalharPerfilKey, createUseGetPerfisKey } from './keys';

export const useGetPerfis = (options?: UseQueryOptions<Perfil[]>) => {
	return useQuery<Perfil[]>(
		createUseGetPerfisKey(),
		() => api.get(`/perfil/listar`).then((response) => response.data),
		options,
	);
};

export const useGetDetalharPerfil = (
	id: number | undefined,
	options?: UseQueryOptions<Perfil[]>,
) => {
	return useQuery<Perfil[]>(
		createUseGetDetalharPerfilKey(id),
		() => api.get(`/perfil/listar/${id}`).then((response) => response.data),
		options,
	);
};
