import { useQuery, UseQueryOptions } from "react-query"
import { Grupo } from "../../models/Grupo"
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