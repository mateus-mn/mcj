import { QueryKey } from 'react-query';

export const createUseGetUsuariosKey = (): QueryKey => ['useGetUsuarios'];
export const createUseGetDetalharUsuarioKey = (id: number | undefined): QueryKey => [
	'useGetDetalharUsuario',
	id,
];
export const createUseGetTotalUsuariosKey = (): QueryKey => ['useGetTotalUsuarios'];
