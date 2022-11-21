import { faFaceDizzy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetVerificarToken } from "../../services/autenticacao";
import logoMcj from "../../images/logoMcj.png";
import Carregando from "../../components/Carregando";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Login";
import Menu from "../../components/Menu";
import GruposPage from "../Grupos";
import HomePage from "../Grupos/Home";
import { Token } from "../../models/Token";
import { toast } from "react-toastify";

const InicialPage = () =>
{
	const { data, isLoading, error } = useGetVerificarToken({
		refetchOnWindowFocus: false,
		onSuccess: (data : Token) =>
		{
			if (data.status === false)
			{
				// se o usuário está na raiz, a mensagem de sessão expirada não é necessária
				if (window.location.pathname !== "/")
				{
					toast.warn ("Sua sessão expirou");
				}
			}
		}
	});

	return(
		<>
			{isLoading && <Carregando />}

			{!isLoading && error &&
				<div className="container mt-3">
					<p className="text-center"> <img className="img-fluid" src={logoMcj} alt="Logo do MCJ" width={150} /> </p>
					<h1 className="text-center"> Desculpe </h1>
					<h3 className="text-center"> Sistema fora do ar provisoriamente </h3>
					<h1 className="text-center"> <FontAwesomeIcon icon={faFaceDizzy} /> </h1>
				</div>
			}

			{data?.status === false &&
				<Routes>
					<Route path="*" element={<LoginPage />} />
				</Routes>
			}

			{data?.status === true &&
				<>
					<Menu />
					<Routes>
						<Route path="/home" element={<HomePage />} />
						<Route path="/grupos" element={<GruposPage />} />
					</Routes>
				</>
			}
		</>
	);
}

export default InicialPage;