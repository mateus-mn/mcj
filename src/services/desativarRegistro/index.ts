import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { Grupo } from "../../models/Grupo";
import { api } from "../global/api";

export const useDesativarRegistro = (id: number | undefined, modulo : string, options? : UseMutationOptions<Grupo, AxiosError, number>) =>
{
	return useMutation<Grupo, AxiosError, number>(
		() => api.put(`/${modulo}/desativar/${id}`).then((response) => response.data),
		options
	);
}