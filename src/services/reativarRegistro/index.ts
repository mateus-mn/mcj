import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { Grupo } from "../../models/Grupo";
import { api } from "../global/api";

export const useReativarRegistro = (id: number | undefined, modulo : string, options? : UseMutationOptions<Grupo, AxiosError, null>) =>
{
	return useMutation<Grupo, AxiosError, null>(
		() => api.put(`/${modulo}/reativar/${id}`).then((response) => response.data),
		options
	);
}