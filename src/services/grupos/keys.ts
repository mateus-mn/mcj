import { QueryKey } from 'react-query';

export const createUseGetGruposKey = (): QueryKey => ['useGetGrupos'];
export const createUseGetDetalharGrupoKey = (id: number | undefined): QueryKey => [
    'useGetDetalharGrupo',
    id,
];
export const createUseGetTotalGruposKey = (): QueryKey => ['useGetTotalGrupos'];
