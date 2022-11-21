import { Dispatch, SetStateAction } from "react";
import { Grupo } from "../../../models/Grupo";

export type TabelaProps =
{
	grupos              : Grupo[] | undefined,
	grupo               : Grupo | undefined,
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