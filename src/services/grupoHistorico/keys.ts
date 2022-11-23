import { QueryKey } from 'react-query';

export const createUseGetHistoricoGrupoKey = (idGrupo: number | undefined): QueryKey => [
    'createUseGetHistoricoGrupo',
    idGrupo,
];
