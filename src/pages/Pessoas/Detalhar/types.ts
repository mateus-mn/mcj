import { Dispatch, SetStateAction } from 'react';
import { Pessoa } from '../../../models/Pessoa';

export type DetalharProps = {
	pessoa: Pessoa | undefined;
	setPessoa: Dispatch<SetStateAction<Pessoa | undefined>>;
	statusModalDetalhar: boolean;
	setStatusModalDetalhar: Dispatch<SetStateAction<boolean>>;
};
