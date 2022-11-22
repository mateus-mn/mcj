import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import Carregando from "../../components/Carregando";
import { Grupo } from "../../models/Grupo";
import { useGetGrupos } from "../../services/grupos";
import Formulario from "./Formulario";
import Tabela from "./Tabela";

const GruposPage = () =>
{
	// controle para exibir e ocultar o modal do formulário
	const [statusFormulario, setStatusFormulario] = useState<boolean>(false);

	// guarda o grupo para conseguir enviar para detalhar, edição ou desativação / reativação
	const [grupo, setGrupo] = useState <Grupo | undefined> (undefined);
	
	const { data : grupos, isLoading, refetch, isRefetching } = useGetGrupos(
	{
		refetchInterval      : false,
		refetchOnWindowFocus : false,
		onError              : () => toast.error ("Desculpe, ocorreu algum erro interno \n Código: listarGrupos")
	});

	return(
		<div className="container-fluid">
			<h1 className="text-center mt-3"> <FontAwesomeIcon icon={faUsers} /> Grupos </h1>
			<button className="btn btn-primary btn-sm" disabled={isLoading || isRefetching} onClick={() => setStatusFormulario (true)}> <FontAwesomeIcon icon={faPlus} /> Novo grupo </button>
			
			{(isLoading || isRefetching) &&
				<Carregando />
			}
			
			{!isLoading && !isRefetching && grupos?.length === 0 &&
				<p className="text-center mt-3"> Não existem grupos cadastrados. </p>
			}

			{!isLoading && !isRefetching && grupos?.length !== 0 &&
				<Tabela
					grupos={grupos}
					grupo={grupo}
					refetch={refetch}
					setGrupo={setGrupo}
					setStatusFormulario={setStatusFormulario}
				/>
			}
			
			{!isLoading && !isRefetching &&
				<Formulario
					statusFormulario={statusFormulario}
					setStatusFormulario={setStatusFormulario}
					refetch={refetch}
					grupo={grupo}
					setGrupo={setGrupo}
				/>
			}
		</div>
	);
}

export default GruposPage;