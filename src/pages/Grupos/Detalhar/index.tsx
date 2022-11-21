import { Modal } from "react-bootstrap";
import { DetalharProps } from "./types";

const Detalhar = ({grupo, setGrupo, statusModalDetalhar, setStatusModalDetalhar} : DetalharProps) =>
{
	const fecharModal = () =>
	{
		setGrupo(undefined);

		setStatusModalDetalhar(false);
	}

	return(
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
				{grupo === undefined
				?
					<p className="text-center"> Sem registro </p>
				:
					<>
						<div className="table-responsive">
							<table className="table table-bordered table-striped">
								<tbody>
									<tr>
										<th> Id </th>
										<td> {grupo.id} </td>
									</tr>
									<tr>
										<th> Número </th>
										<td> {grupo.numero} </td>
									</tr>
									<tr>
										<th> Nome </th>
										<td> {grupo.nome} </td>
									</tr>
									<tr>
										<th> Ativo </th>
										<td> {grupo.ativo === true ? "Sim" : "Não"} </td>
									</tr>
								</tbody>
							</table>
						</div>
					</>
				}
			</Modal.Body>
		</Modal>
	);
}

export default Detalhar;