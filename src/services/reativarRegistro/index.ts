import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { api } from '../global/api';

export const useReativarRegistro = (
	id: number | undefined,
	modulo: string,
	options?: UseMutationOptions<null, AxiosError, null>,
) => {
	return useMutation<null, AxiosError, null>(
		() => api.put(`/${modulo}/reativar/${id}`).then((response) => response.data),
		options,
	);
};
