import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { Pessoa } from '../../models/Pessoa';
import { Total } from '../../models/Total';
import { PessoaForm } from '../../pages/Pessoas/Formulario/types';
import { api } from '../global/api';
import {
	createUseGetDetalharPessoaKey,
	createUseGetPessoasKey,
	createUseGetTotalPessoasKey,
} from './keys';

export const useGetPessoas = (options?: UseQueryOptions<Pessoa[]>) => {
	return useQuery<Pessoa[]>(
		createUseGetPessoasKey(),
		() =>
			fetch(`${api.href}pessoa/listar`, {
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

export const useGetDetalharPessoa = (
	id: number | undefined,
	options?: UseQueryOptions<Pessoa[]>,
) => {
	return useQuery<Pessoa[]>(
		createUseGetDetalharPessoaKey(id),
		() =>
			fetch(`${api.href}pessoa/listar/${id}`, {
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

export const useGetTotalPessoas = (options?: UseQueryOptions<Total>) => {
	return useQuery<Total>(
		createUseGetTotalPessoasKey(),
		() =>
			fetch(`${api.href}pessoa/listarTotais`, {
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

export const useAddPessoa = (options?: UseMutationOptions<Pessoa, AxiosError, PessoaForm>) => {
	return useMutation<Pessoa, AxiosError, PessoaForm>(
		(data) =>
			fetch(`${api.href}pessoa/cadastrar`, {
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

export const useAlterPessoa = (
	id: number | undefined,
	options?: UseMutationOptions<Pessoa, AxiosError, PessoaForm>,
) => {
	return useMutation<Pessoa, AxiosError, PessoaForm>(
		(data) =>
			fetch(`${api.href}pessoa/alterar/${id}`, {
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
