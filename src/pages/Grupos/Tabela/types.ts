import { Dispatch, SetStateAction } from "react";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";
import { Grupo } from "../../../models/Grupo";

export type TabelaProps =
{
	grupos              : Grupo[] | undefined,
	grupo               : Grupo | undefined,
	refetch             : <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<Grupo[], unknown>>, 
	setGrupo            : Dispatch<SetStateAction<Grupo | undefined>>,
	setStatusFormulario : Dispatch<SetStateAction<boolean>>
}

export type ColunasTabela =
{
	id     : number,
	numero : number,
	nome   : string,
	ativo  : boolean
}