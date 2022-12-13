import { QueryKey } from 'react-query';

export const createUseGetPerfisKey = (): QueryKey => ['useGetPerfis'];
export const createUseGetDetalharPerfilKey = (id: number | undefined): QueryKey => [
	'useGetDetalharPerfil',
	id,
];
