import { QueryKey } from 'react-query';

export const createUseGetHistoricoPessoaKey = (idPessoa: number | undefined): QueryKey => [
	'createUseGetHistoricoPessoa',
	idPessoa,
];
