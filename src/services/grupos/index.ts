import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { Grupo } from '../../models/Grupo';
import { Total } from '../../models/Total';
import { GrupoForm } from '../../pages/Grupos/Formulario/types';
import { api } from '../global/api';
import {
    createUseGetDetalharGrupoKey,
    createUseGetGruposKey,
    createUseGetTotalGruposKey,
} from './keys';

export const useGetGrupos = (options?: UseQueryOptions<Grupo[]>) => {
    return useQuery<Grupo[]>(
        createUseGetGruposKey(),
        () => api.get<Grupo[]>('/grupo/listar').then((response) => response.data),
        options,
    );
};

export const useGetDetalharGrupo = (id: number | undefined, options?: UseQueryOptions<Grupo[]>) => {
    return useQuery<Grupo[]>(
        createUseGetDetalharGrupoKey(id),
        () => api.get<Grupo[]>(`/grupo/listar/${id}`).then((response) => response.data),
        options,
    );
};

export const useGetTotalGrupos = (options?: UseQueryOptions<Total>) => {
    return useQuery<Total>(
        createUseGetTotalGruposKey(),
        () => api.get<Total>('/grupo/listarTotais').then((response) => response.data),
        options,
    );
};

export const useAddGrupo = (options?: UseMutationOptions<Grupo, AxiosError, GrupoForm>) => {
    return useMutation<Grupo, AxiosError, GrupoForm>(
        (data) => api.post('/grupo/cadastrar', data).then((response) => response.data),
        options,
    );
};

export const useAlterGrupo = (
    id: number | undefined,
    options?: UseMutationOptions<Grupo, AxiosError, GrupoForm>,
) => {
    return useMutation<Grupo, AxiosError, GrupoForm>(
        (data) => api.put(`/grupo/alterar/${id}`, data).then((response) => response.data),
        options,
    );
};
