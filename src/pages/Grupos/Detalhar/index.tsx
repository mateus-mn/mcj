import moment from 'moment';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Carregando from '../../../components/Carregando';
import { useGetHistoricoGrupo } from '../../../services/grupoHistorico';
import { useGetDetalharGrupo } from '../../../services/grupos';
import { DetalharProps } from './types';

const Detalhar = ({
	grupo,
	setGrupo,
	statusModalDetalhar,
	setStatusModalDetalhar,
}: DetalharProps) => {
	const { data, isLoading } = useGetDetalharGrupo(grupo?.id, {
		refetchInterval: false,
		refetchOnWindowFocus: false,
		enabled: !!grupo && statusModalDetalhar === true,
		onError: () =>
			toast.error(`Desculpe, ocorreu algum erro interno \n Código: listarGrupo${grupo?.id}`),
	});

	const { data: historico, isLoading: isLoadingHistorico } = useGetHistoricoGrupo(grupo?.id, {
		refetchInterval: false,
		refetchOnWindowFocus: false,
		enabled: !!grupo && statusModalDetalhar === true,
		onError: () =>
			toast.error(
				`Desculpe, ocorreu algum erro interno \n Código: listarHistoricoGrupo${grupo?.id}`,
			),
	});

	const fecharModal = () => {
		setGrupo(undefined);
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
				<Modal.Title> Dados do grupo </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{grupo === undefined ? (
					<p className="text-center"> Sem registro </p>
				) : (
					<>
						{isLoading && <Carregando />}

						{!isLoading && data?.length === 0 && (
							<p className="text-center"> Sem registro </p>
						)}

						{!isLoading && data?.length !== 0 && (
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
													<th> Número </th>
													<td> {item.numero} </td>
												</tr>
												<tr>
													<th> Nome </th>
													<td> {item.nome} </td>
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

						{isLoadingHistorico && <Carregando />}

						{!isLoadingHistorico && historico?.length === 0 && (
							<p className="text-center"> Sem registro </p>
						)}

						{!isLoadingHistorico && historico?.length !== 0 && (
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
															{' '}
															{moment(item.dataHoraRegistro).format(
																'DD/MM/YYYY',
															)}{' '}
														</td>
														<td>
															{' '}
															{moment(item.dataHoraRegistro).format(
																'HH:mm:ss',
															)}{' '}
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
