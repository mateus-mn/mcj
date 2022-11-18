import { Dispatch, SetStateAction } from "react";

export type FormularioProps = 
{
	statusFormulario    : boolean,
	setStatusFormulario : Dispatch<SetStateAction<boolean>>
}

export type GrupoForm =
{
	numero : number,
	nome   : string
}