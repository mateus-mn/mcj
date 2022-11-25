import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { Grupo } from '../../models/Grupo';
import { api } from '../global/api';

export const useDesativarRegistro = (
	id: number | undefined,
	modulo: string,
	options?: UseMutationOptions<Grupo, AxiosError, null>,
) => {
	return useMutation<Grupo, AxiosError, null>(
		() =>
			fetch(`${api.href}${modulo}/desativar/${id}`, {
				mode: 'cors',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					Authorization: 'Bearer ' + sessionStorage.getItem('tokenUsuario'),
				},
				method: 'PUT',
			}).then((response) => response.json()),
		options,
	);
};
