import { faFaceSmileBeam, faFrown, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Carregando from "../../../components/Carregando";
import { useGetTotalGrupos } from "../../../services/grupos";

const HomePage = () =>
{
	const { data : totalGrupos, isLoading : isLoadingTotalGrupos, isError : isErrorTotalGrupos } = useGetTotalGrupos(
		{
			refetchInterval      : false,
			refetchOnWindowFocus : false
		});

	return(
		<>
			<h2 className="text-center mt-3"> Bem-vindo, {sessionStorage.getItem ("nomeUsuario")} <FontAwesomeIcon icon={faFaceSmileBeam} />  </h2>
			
			<div className="row justify-content-center mt-3">
				<div className="col-3 mt-3">
					<div className="card h-100">
						<div className="card-header"> <FontAwesomeIcon icon={faUsers} /> Grupos </div>
						<div className="card-body">
							{isLoadingTotalGrupos && <Carregando />}
							
							{isErrorTotalGrupos &&
								<>
									<p className="text-center"> Desculpe, não foi possível exibir o total de grupos </p>
									<p className="text-center"> <FontAwesomeIcon icon={faFrown} /> </p>
								</>
							}
							
							{!isLoadingTotalGrupos && !isErrorTotalGrupos && totalGrupos?.total === 0 &&
								<p className="card-title text-center"> Sem registros </p>
							}
							
							{!isLoadingTotalGrupos && !isErrorTotalGrupos && totalGrupos?.total !== 0 &&
								<>
									<h5 className="card-title text-center"> {`${totalGrupos?.total} cadastros`} </h5>
									<h6 className="card-title text-center"> {`${totalGrupos?.totalAtivos} ativos`} </h6>
								</>
							}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default HomePage;