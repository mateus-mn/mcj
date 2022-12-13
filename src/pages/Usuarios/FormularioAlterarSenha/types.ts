import { Dispatch, SetStateAction } from 'react';
import { Usuario } from '../../../models/Usuario';

export type FormularioAlterarSenhaProps = {
	statusFormularioAlterarSenha: boolean;
	setStatusFormularioAlterarSenha: Dispatch<SetStateAction<boolean>>;
	usuario: Usuario | undefined;
	setUsuario: Dispatch<SetStateAction<Usuario | undefined>>;
};

export type AlterarSenhaForm = {
	novaSenha: string;
};
