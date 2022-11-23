import { Dispatch, SetStateAction } from 'react';
import { Grupo } from '../../../models/Grupo';

export type DetalharProps = {
	grupo: Grupo | undefined;
	setGrupo: Dispatch<SetStateAction<Grupo | undefined>>;
	statusModalDetalhar: boolean;
	setStatusModalDetalhar: Dispatch<SetStateAction<boolean>>;
};
