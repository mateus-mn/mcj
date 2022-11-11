import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import Carregando from "../../components/Carregando";
import { useGetGrupos } from "../../services/grupos";
import Formulario from "./Formulario";

const GruposPage = () =>
{
	// busca os dados do back
	const { data, isLoading } = useGetGrupos(
	{
		onError: (teste) => toast.error ("Desculpe, ocorreu algum erro interno \n Código: listarGrupos")
	});

	// controle para exibir e ocultar o modal do formulário
	const [statusFormulario, setStatusFormulario] = useState<boolean>(false);

	return(
		<div className="container-fluid">
			<h1 className="text-center mt-3"> <FontAwesomeIcon icon={faUsers} /> Grupos </h1>
			<button className="btn btn-primary btn-sm" disabled={isLoading} onClick={() => setStatusFormulario (true)}> <FontAwesomeIcon icon={faPlus} /> Novo grupo </button>
			
			{isLoading && <Carregando />}
			
			{!isLoading && data?.length === 0 && <p className="text-center mt-3"> Não existem grupos cadastrados. </p>}
			
			{!isLoading &&
				<Formulario
					statusFormulario={statusFormulario}
					setStatusFormulario={setStatusFormulario}
				/>
			}
		</div>
	);
}

export default GruposPage;