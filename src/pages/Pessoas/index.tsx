import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Carregando from '../../components/Carregando';

import { Pessoa } from '../../models/Pessoa';

import { useGetPessoas } from '../../services/pessoas';
import Formulario from './Formulario';
import Tabela from './Tabela';

const PessoasPage = () => {
	// controle para exibir e ocultar o modal do formulário
	const [statusFormulario, setStatusFormulario] = useState<boolean>(false);

	// guarda a pessoa para conseguir enviar para detalhar, edição ou desativação / reativação
	const [pessoa, setPessoa] = useState<Pessoa | undefined>(undefined);

	const {
		data: pessoas,
		isLoading,
		refetch,
		isRefetching,
	} = useGetPessoas({
		refetchInterval: false,
		refetchOnWindowFocus: false,
		onError: () => toast.error('Desculpe, ocorreu algum erro interno \n Código: listarPessoas'),
	});

	return (
		<div className="container-fluid">
			<h1 className="text-center mt-3">
				<FontAwesomeIcon icon={faUser} /> Pessoas
			</h1>
			<button
				className="btn btn-primary btn-sm"
				disabled={isLoading || isRefetching}
				onClick={() => setStatusFormulario(true)}
			>
				<FontAwesomeIcon icon={faPlus} /> Nova pessoa
			</button>

			{(isLoading || isRefetching) && <Carregando />}

			{!isLoading && !isRefetching && pessoas?.length === 0 && (
				<p className="text-center mt-3"> Não existem pessoas cadastradas. </p>
			)}

			{!isLoading && !isRefetching && pessoas?.length !== 0 && (
				<Tabela
					pessoas={pessoas}
					pessoa={pessoa}
					refetch={refetch}
					setPessoa={setPessoa}
					setStatusFormulario={setStatusFormulario}
				/>
			)}

			{!isLoading && !isRefetching && (
				<Formulario
					statusFormulario={statusFormulario}
					setStatusFormulario={setStatusFormulario}
					refetch={refetch}
					pessoa={pessoa}
					setPessoa={setPessoa}
				/>
			)}
		</div>
	);
};

export default PessoasPage;
