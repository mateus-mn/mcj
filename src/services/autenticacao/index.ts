import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { Token } from '../../models/Token';
import { LoginForm } from '../../pages/Login/types';
import { api } from '../global/api';
import { createUseGetVerificarTokenKey } from './keys';

export const useGetVerificarToken = (options?: UseQueryOptions<Token>) => {
	// Obs.: o back retorna erro 400 se eu envio uma string vazia
	const token = sessionStorage.getItem('tokenUsuario') || 'MMN';

	return useQuery<Token>(
		createUseGetVerificarTokenKey(),
		() =>
			fetch(`${api.href}auth/verificarToken`, {
				mode: 'cors',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				method: 'POST',
				body: token,
			}).then((response) => response.json()),
		options,
	);
};

export const useAutenticar = (options?: UseMutationOptions<Token, AxiosError, LoginForm>) => {
	return useMutation<Token, AxiosError, LoginForm>(
		(data) =>
			fetch(`${api.href}auth/login`, {
				mode: 'cors',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				method: 'POST',
				body: JSON.stringify(data),
			}).then((response) => response.json()),
		options,
	);
};
