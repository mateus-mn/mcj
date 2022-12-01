import { QueryKey } from 'react-query';

export const createUseGetSexosKey = (): QueryKey => ['useGetSexos'];
export const createUseGetDetalharSexoKey = (id: number | undefined): QueryKey => [
	'useGetDetalharSexo',
	id,
];
