import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { Grupo } from '../../models/Grupo';
import { Total } from '../../models/Total';
import { GrupoForm } from '../../pages/Grupos/Formulario/types';
import { api } from '../global/api';
import {
	createUseGetDetalharGrupoKey,
	createUseGetGruposKey,
	createUseGetTotalGruposKey,
} from './keys';

export const useGetGrupos = (options?: UseQueryOptions<Grupo[]>) => {
	return useQuery<Grupo[]>(
		createUseGetGruposKey(),
		() =>
			fetch(`${api.href}grupo/listar`, {
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

export const useGetDetalharGrupo = (id: number | undefined, options?: UseQueryOptions<Grupo[]>) => {
	return useQuery<Grupo[]>(
		createUseGetDetalharGrupoKey(id),
		() =>
			fetch(`${api.href}grupo/listar/${id}`, {
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

export const useGetTotalGrupos = (options?: UseQueryOptions<Total>) => {
	return useQuery<Total>(
		createUseGetTotalGruposKey(),
		() =>
			fetch(`${api.href}grupo/listarTotais`, {
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

export const useAddGrupo = (options?: UseMutationOptions<Grupo, AxiosError, GrupoForm>) => {
	return useMutation<Grupo, AxiosError, GrupoForm>(
		(data) =>
			fetch(`${api.href}grupo/cadastrar`, {
				mode: 'cors',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					Authorization: 'Bearer ' + sessionStorage.getItem('tokenUsuario'),
				},
				method: 'POST',
				body: JSON.stringify(data),
			}).then((response) => response.json()),
		options,
	);
};

export const useAlterGrupo = (
	id: number | undefined,
	options?: UseMutationOptions<Grupo, AxiosError, GrupoForm>,
) => {
	return useMutation<Grupo, AxiosError, GrupoForm>(
		(data) =>
			fetch(`${api.href}grupo/alterar/${id}`, {
				mode: 'cors',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					Authorization: 'Bearer ' + sessionStorage.getItem('tokenUsuario'),
				},
				method: 'PUT',
				body: JSON.stringify(data),
			}).then((response) => response.json()),
		options,
	);
};
