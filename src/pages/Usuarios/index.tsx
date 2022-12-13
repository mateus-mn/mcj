import { faPlus, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Carregando from '../../components/Carregando';
import { Usuario } from '../../models/Usuario';
import { useGetUsuarios } from '../../services/usuarios';
import Formulario from './Formulario';
import Tabela from './Tabela';

const UsuariosPage = () => {
	// controle para exibir e ocultar o modal do formulário
	const [statusFormulario, setStatusFormulario] = useState<boolean>(false);

	// guarda o usuário para conseguir enviar para detalhar, edição ou desativação / reativação
	const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

	const {
		data: usuarios,
		isLoading,
		refetch,
		isRefetching,
	} = useGetUsuarios({
		refetchInterval: false,
		refetchOnWindowFocus: false,
		onError: () =>
			toast.error('Desculpe, ocorreu algum erro interno \n Código: listarUsuarios'),
	});

	return (
		<div className="container-fluid">
			<h1 className="text-center mt-3">
				<FontAwesomeIcon icon={faUserAstronaut} /> Usuários
			</h1>
			<button
				className="btn btn-primary btn-sm"
				disabled={isLoading || isRefetching}
				onClick={() => setStatusFormulario(true)}
			>
				<FontAwesomeIcon icon={faPlus} /> Novo usuário
			</button>

			{(isLoading || isRefetching) && <Carregando />}

			{!isLoading && !isRefetching && usuarios?.length === 0 && (
				<p className="text-center mt-3"> Não existem usuários cadastrados. </p>
			)}

			{!isLoading && !isRefetching && usuarios?.length !== 0 && (
				<Tabela
					usuarios={usuarios}
					usuario={usuario}
					refetch={refetch}
					setUsuario={setUsuario}
					setStatusFormulario={setStatusFormulario}
				/>
			)}

			{!isLoading && !isRefetching && (
				<Formulario
					statusFormulario={statusFormulario}
					setStatusFormulario={setStatusFormulario}
					refetch={refetch}
					usuario={usuario}
					setUsuario={setUsuario}
				/>
			)}
		</div>
	);
};

export default UsuariosPage;
