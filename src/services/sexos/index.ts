import { useQuery, UseQueryOptions } from 'react-query';
import { Sexo } from '../../models/Sexo';

import { api } from '../global/api';
import { createUseGetDetalharSexoKey, createUseGetSexosKey } from './keys';

export const useGetSexos = (options?: UseQueryOptions<Sexo[]>) => {
	return useQuery<Sexo[]>(
		createUseGetSexosKey(),
		() =>
			fetch(`${api.href}sexo/listar`, {
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

export const useGetDetalharSexo = (id: number | undefined, options?: UseQueryOptions<Sexo[]>) => {
	return useQuery<Sexo[]>(
		createUseGetDetalharSexoKey(id),
		() =>
			fetch(`${api.href}sexo/listar/${id}`, {
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
