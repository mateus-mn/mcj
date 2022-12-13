import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { api } from '../global/api';

export const useDesativarRegistro = (
	id: number | undefined,
	modulo: string,
	options?: UseMutationOptions<null, AxiosError, null>,
) => {
	return useMutation<null, AxiosError, null>(
		() => api.put(`/${modulo}/desativar/${id}`).then((response) => response.data),
		options,
	);
};
