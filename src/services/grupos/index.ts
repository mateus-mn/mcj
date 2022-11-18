import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "react-query"
import { Grupo } from "../../models/Grupo"
import { GrupoForm } from "../../pages/Grupo/Formulario/types";
import { api } from "../global/api";
import { createUseGetGruposKey } from "./keys"

export const useGetGrupos = (options? : UseQueryOptions<Grupo[]>) =>
{
	return useQuery<Grupo[]>
	(
		createUseGetGruposKey(),
		() => api.get<Grupo[]>("/grupo/listar")
		.then((response) => response.data),
		options
	);
}

export const useAddGrupo = (options? : UseMutationOptions<Grupo, AxiosError, GrupoForm>) =>
{
	return useMutation<Grupo, AxiosError, GrupoForm>(
		(data) => api.post("/grupo/cadastrar", data).then((response) => response.data),
		options
	);
}