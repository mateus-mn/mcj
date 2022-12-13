import { QueryKey } from 'react-query';

export const createUseGetHistoricoUsuarioKey = (idUsuario: number | undefined): QueryKey => [
	'createUseGetHistoricoGrupo',
	idUsuario,
];
