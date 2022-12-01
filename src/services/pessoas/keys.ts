import { QueryKey } from 'react-query';

export const createUseGetPessoasKey = (): QueryKey => ['useGetPessoas'];
export const createUseGetDetalharPessoaKey = (id: number | undefined): QueryKey => [
	'useGetDetalharPessoa',
	id,
];
export const createUseGetTotalPessoasKey = (): QueryKey => ['useGetTotalPessoas'];
