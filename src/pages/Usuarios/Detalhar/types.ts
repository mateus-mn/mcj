import { Dispatch, SetStateAction } from 'react';
import { Usuario } from '../../../models/Usuario';

export type DetalharProps = {
	usuario: Usuario | undefined;
	setUsuario: Dispatch<SetStateAction<Usuario | undefined>>;
	statusModalDetalhar: boolean;
	setStatusModalDetalhar: Dispatch<SetStateAction<boolean>>;
};
