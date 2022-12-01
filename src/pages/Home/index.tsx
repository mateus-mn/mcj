import { faFaceSmileBeam, faFrown, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carregando from '../../components/Carregando';
import { useGetTotalGrupos } from '../../services/grupos';
import { useGetTotalPessoas } from '../../services/pessoas';

const HomePage = () => {
	const {
		data: totalPessoas,
		isLoading: isLoadingTotalPessoas,
		isError: isErrorTotalPessoas,
	} = useGetTotalPessoas({
		refetchInterval: false,
		refetchOnWindowFocus: false,
	});
	const {
		data: totalGrupos,
		isLoading: isLoadingTotalGrupos,
		isError: isErrorTotalGrupos,
	} = useGetTotalGrupos({
		refetchInterval: false,
		refetchOnWindowFocus: false,
	});

	const goTo = (modulo: string) => {
		window.location.href = `/${modulo}`;
	};

	return (
		<>
			<h2 className="text-center mt-3">
				Bem-vindo, {sessionStorage.getItem('nomeUsuario')}{' '}
				<FontAwesomeIcon icon={faFaceSmileBeam} />
			</h2>

			<div className="row justify-content-center mt-3">
				<div className="col-3 mt-3">
					<div className="card h-100">
						<div
							className="card-header"
							onClick={() => goTo('pessoas')}
							style={{ cursor: 'pointer' }}
						>
							<FontAwesomeIcon icon={faUser} /> Pessoas
						</div>
						<div className="card-body">
							{isLoadingTotalPessoas && <Carregando />}

							{isErrorTotalPessoas && (
								<>
									<p className="text-center">
										Desculpe, não foi possível exibir o total de pessoas
									</p>
									<p className="text-center">
										<FontAwesomeIcon icon={faFrown} />
									</p>
								</>
							)}

							{!isLoadingTotalPessoas &&
								!isErrorTotalPessoas &&
								totalPessoas?.total === 0 && (
									<p className="card-title text-center"> Sem registros </p>
								)}

							{!isLoadingTotalPessoas &&
								!isErrorTotalPessoas &&
								totalPessoas?.total !== 0 && (
									<>
										<h5 className="card-title text-center">
											{totalPessoas?.total === 1
												? `${totalPessoas?.total} cadastro`
												: `${totalPessoas?.total} cadastros`}
										</h5>
										<h6 className="card-title text-center">
											{totalPessoas?.totalAtivos === 1
												? `${totalPessoas?.totalAtivos} ativo`
												: `${totalPessoas?.totalAtivos} ativos`}
										</h6>
										<h6 className="card-title text-center">
											{totalPessoas?.totalInativos === 1
												? `${totalPessoas?.totalInativos} desativado`
												: `${totalPessoas?.totalInativos} desativados`}
										</h6>
									</>
								)}
						</div>
					</div>
				</div>
				<div className="col-3 mt-3">
					<div className="card h-100">
						<div
							className="card-header"
							onClick={() => goTo('grupos')}
							style={{ cursor: 'pointer' }}
						>
							<FontAwesomeIcon icon={faUsers} /> Grupos
						</div>
						<div className="card-body">
							{isLoadingTotalGrupos && <Carregando />}

							{isErrorTotalGrupos && (
								<>
									<p className="text-center">
										Desculpe, não foi possível exibir o total de grupos
									</p>
									<p className="text-center">
										<FontAwesomeIcon icon={faFrown} />
									</p>
								</>
							)}

							{!isLoadingTotalGrupos &&
								!isErrorTotalGrupos &&
								totalGrupos?.total === 0 && (
									<p className="card-title text-center"> Sem registros </p>
								)}

							{!isLoadingTotalGrupos &&
								!isErrorTotalGrupos &&
								totalGrupos?.total !== 0 && (
									<>
										<h5 className="card-title text-center">
											{totalGrupos?.total === 1
												? `${totalGrupos?.total} cadastro`
												: `${totalGrupos?.total} cadastros`}
										</h5>
										<h6 className="card-title text-center">
											{totalGrupos?.totalAtivos === 1
												? `${totalGrupos?.totalAtivos} ativo`
												: `${totalGrupos?.totalAtivos} ativos`}
										</h6>
										<h6 className="card-title text-center">
											{totalGrupos?.totalInativos === 1
												? `${totalGrupos?.totalInativos} desativado`
												: `${totalGrupos?.totalInativos} desativados`}
										</h6>
									</>
								)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;
