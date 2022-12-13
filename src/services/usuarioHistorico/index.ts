import { useQuery, UseQueryOptions } from 'react-query';
import { UsuarioHistorico } from '../../models/UsuarioHistorico';
import { api } from '../global/api';
import { createUseGetHistoricoUsuarioKey } from './keys';

export const useGetHistoricoUsuario = (
	idUsuario: number | undefined,
	options?: UseQueryOptions<UsuarioHistorico[]>,
) => {
	return useQuery<UsuarioHistorico[]>(
		createUseGetHistoricoUsuarioKey(idUsuario),
		() => api.get(`/usuarioHistorico/listar/${idUsuario}`).then((response) => response.data),
		options,
	);
};
