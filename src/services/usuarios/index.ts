import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { Total } from '../../models/Total';
import { Usuario } from '../../models/Usuario';
import { UsuarioForm } from '../../pages/Usuarios/Formulario/types';
import { AlterarSenhaForm } from '../../pages/Usuarios/FormularioAlterarSenha/types';
import { api } from '../global/api';
import {
	createUseGetDetalharUsuarioKey,
	createUseGetTotalUsuariosKey,
	createUseGetUsuariosKey,
} from './keys';

export const useGetUsuarios = (options?: UseQueryOptions<Usuario[]>) => {
	return useQuery<Usuario[]>(
		createUseGetUsuariosKey(),
		() => api.get(`/usuario/listar`).then((response) => response.data),
		options,
	);
};

export const useGetDetalharUsuario = (
	id: number | undefined,
	options?: UseQueryOptions<Usuario[]>,
) => {
	return useQuery<Usuario[]>(
		createUseGetDetalharUsuarioKey(id),
		() => api.get(`/usuario/listar/${id}`).then((response) => response.data),
		options,
	);
};

export const useGetTotalUsuarios = (options?: UseQueryOptions<Total>) => {
	return useQuery<Total>(
		createUseGetTotalUsuariosKey(),
		() => api.get('/usuario/listarTotais').then((response) => response.data),
		options,
	);
};

export const useAddUsuario = (options?: UseMutationOptions<Usuario, AxiosError, UsuarioForm>) => {
	return useMutation<Usuario, AxiosError, UsuarioForm>(
		(data) => api.post('/usuario/cadastrar', data).then((response) => response.data),
		options,
	);
};

export const useAlterUsuario = (
	id: number | undefined,
	options?: UseMutationOptions<Usuario, AxiosError, UsuarioForm>,
) => {
	return useMutation<Usuario, AxiosError, UsuarioForm>(
		(data) => api.put(`/usuario/alterar/${id}`, data).then((response) => response.data),
		options,
	);
};

export const useAlterSenha = (
	id: number | undefined,
	options?: UseMutationOptions<Usuario, AxiosError, AlterarSenhaForm>,
) => {
	return useMutation<Usuario, AxiosError, AlterarSenhaForm>(
		(data) => api.put(`/usuario/alterarSenha/${id}`, data).then((response) => response.data),
		options,
	);
};
