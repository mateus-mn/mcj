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
		() => api.get(`/pessoa/listar/`).then((response) => response.data),
		options,
	);
};

export const useGetDetalharPessoa = (
	id: number | undefined,
	options?: UseQueryOptions<Pessoa[]>,
) => {
	return useQuery<Pessoa[]>(
		createUseGetDetalharPessoaKey(id),
		() => api.get(`/pessoa/listar/${id}`).then((response) => response.data),
		options,
	);
};

export const useGetTotalPessoas = (options?: UseQueryOptions<Total>) => {
	return useQuery<Total>(
		createUseGetTotalPessoasKey(),
		() => api.get('/pessoa/listarTotais').then((response) => response.data),
		options,
	);
};

export const useAddPessoa = (options?: UseMutationOptions<Pessoa, AxiosError, PessoaForm>) => {
	return useMutation<Pessoa, AxiosError, PessoaForm>(
		(data) => api.post('/pessoa/cadastrar', data).then((response) => response.data),
		options,
	);
};

export const useAlterPessoa = (
	id: number | undefined,
	options?: UseMutationOptions<Pessoa, AxiosError, PessoaForm>,
) => {
	return useMutation<Pessoa, AxiosError, PessoaForm>(
		(data) => api.put(`/pessoa/alterar/${id}`, data).then((response) => response.data),
		options,
	);
};
