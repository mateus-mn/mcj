import { useQuery, UseQueryOptions } from 'react-query';
import { Sexo } from '../../models/Sexo';

import { api } from '../global/api';
import { createUseGetDetalharSexoKey, createUseGetSexosKey } from './keys';

export const useGetSexos = (options?: UseQueryOptions<Sexo[]>) => {
	return useQuery<Sexo[]>(
		createUseGetSexosKey(),
		() => api.get(`/sexo/listar`).then((response) => response.data),
		options,
	);
};

export const useGetDetalharSexo = (id: number | undefined, options?: UseQueryOptions<Sexo[]>) => {
	return useQuery<Sexo[]>(
		createUseGetDetalharSexoKey(id),
		() => api.get(`/sexo/listar/${id}`).then((response) => response.data),
		options,
	);
};
