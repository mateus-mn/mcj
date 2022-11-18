import { Grupo } from "../../../models/Grupo";

export type TabelaProps =
{
	dados : Grupo[] | undefined
}

export type ColunasTabela =
{
	id     : number,
	numero : number,
	nome   : string,
	ativo  : boolean
}