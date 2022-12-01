import moment from 'moment';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Carregando from '../../../components/Carregando';
import { useGetHistoricoPessoa } from '../../../services/pessoaHistorico';
import { useGetDetalharPessoa } from '../../../services/pessoas';
import { DetalharProps } from './types';

const Detalhar = ({
	pessoa,
	setPessoa,
	statusModalDetalhar,
	setStatusModalDetalhar,
}: DetalharProps) => {
	const { data, isLoading, isRefetching } = useGetDetalharPessoa(pessoa?.id, {
		refetchInterval: false,
		refetchOnWindowFocus: false,
		enabled: !!pessoa && statusModalDetalhar === true,
		onError: () =>
			toast.error(
				`Desculpe, ocorreu algum erro interno \n Código: listarPessoa${pessoa?.id}`,
			),
	});

	const {
		data: historico,
		isLoading: isLoadingHistorico,
		isRefetching: isRefetchingHistorico,
	} = useGetHistoricoPessoa(pessoa?.id, {
		refetchInterval: false,
		refetchOnWindowFocus: false,
		enabled: !!pessoa && statusModalDetalhar === true,
		onError: () =>
			toast.error(
				`Desculpe, ocorreu algum erro interno \n Código: listarHistoricoPessoa${pessoa?.id}`,
			),
	});

	const fecharModal = () => {
		setPessoa(undefined);
		setStatusModalDetalhar(false);
	};

	return (
		<Modal
			size="lg"
			show={statusModalDetalhar}
			onHide={fecharModal}
			backdrop="static"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title> Dados da pessoa </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{pessoa === undefined ? (
					<p className="text-center"> Sem registro </p>
				) : (
					<>
						{(isLoading || isRefetching) && <Carregando />}

						{!(isLoading || isRefetching) && data?.length === 0 && (
							<p className="text-center"> Sem registro </p>
						)}

						{!(isLoading || isRefetching) && data?.length !== 0 && (
							<div className="table-responsive">
								<table className="table table-bordered table-striped">
									{data?.map((item) => {
										return (
											<tbody key={item.id}>
												<tr>
													<th> Id </th>
													<td> {item.id} </td>
												</tr>
												<tr>
													<th> Nome </th>
													<td> {item.nome} </td>
												</tr>
												<tr>
													<th> Data de nascimento </th>
													<td>
														{moment(item.dataNascimento).format(
															'DD/MM/YYYY',
														)}
													</td>
												</tr>
												<tr>
													<th> Sexo </th>
													<td>
														<>
															{item.descricaoSexo} ({item.siglaSexo})
														</>
													</td>
												</tr>
												<tr>
													<th> E-mail </th>
													<td>
														{item.email === null ? (
															<b> Sem registro </b>
														) : (
															item.email
														)}
													</td>
												</tr>
												<tr>
													<th> Celular </th>
													<td>
														{item.celular === null ? (
															<b> Sem registro </b>
														) : (
															item.celular
														)}
													</td>
												</tr>
												<tr>
													<th> Ativo </th>
													<td> {item.ativo === true ? 'Sim' : 'Não'} </td>
												</tr>
											</tbody>
										);
									})}
								</table>
							</div>
						)}

						<h4 className="text-center mt-3"> Histórico </h4>

						{(isLoadingHistorico || isRefetchingHistorico) && <Carregando />}

						{!(isLoadingHistorico || isRefetchingHistorico) &&
							historico?.length === 0 && (
								<p className="text-center"> Sem registro </p>
							)}

						{!(isLoadingHistorico || isRefetchingHistorico) &&
							historico?.length !== 0 && (
								<>
									<div className="table-responsive">
										<table className="table table-bordered table-striped">
											<thead>
												<tr>
													<th className="text-center"> Situação </th>
													<th className="text-center"> Data </th>
													<th className="text-center"> Hora </th>
													<th className="text-center"> Usuário </th>
												</tr>
											</thead>
											<tbody>
												{historico?.map((item) => {
													return (
														<tr key={item.id}>
															<td> {item.descricaoSituacao} </td>
															<td>
																{moment(
																	item.dataHoraRegistro,
																).format('DD/MM/YYYY')}
															</td>
															<td>
																{moment(
																	item.dataHoraRegistro,
																).format('HH:mm:ss')}
															</td>
															<td> {item.usuarioRegistro} </td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</>
							)}
					</>
				)}
			</Modal.Body>
		</Modal>
	);
};

export default Detalhar;
