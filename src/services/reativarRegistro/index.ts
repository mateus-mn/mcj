import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { Grupo } from '../../models/Grupo';
import { api } from '../global/api';

export const useReativarRegistro = (
	id: number | undefined,
	modulo: string,
	options?: UseMutationOptions<Grupo, AxiosError, null>,
) => {
	return useMutation<Grupo, AxiosError, null>(
		(data) =>
			fetch(`${api.href}${modulo}/reativar/${id}`, {
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
