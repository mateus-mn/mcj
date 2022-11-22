import { Dispatch, SetStateAction } from "react"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query"
import { Grupo } from "../../models/Grupo"

export type ReativarRegistroProps =
{
	id                         : number | undefined,
	modulo                     : string,
	refetch                    : <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<Grupo[], unknown>>,
	statusReativarRegistro    : boolean,
	setStatusReativarRegistro : Dispatch<SetStateAction<boolean>>
}