import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useReativarRegistro } from '../../../services/reativarRegistro';
import { ReativarRegistroProps } from './types';

const Reativar = ({
	id,
	modulo,
	refetch,
	statusReativarRegistro,
	setStatusReativarRegistro,
}: ReativarRegistroProps) => {
	const { mutate, isLoading } = useReativarRegistro(id, modulo);

	const reativar = () => {
		mutate(null, {
			onSuccess: async () => {
				toast.success('Usuário reativado com sucesso');
				refetch();
				setStatusReativarRegistro(false);
			},
			onError: async () => {
				toast.error(
					`Desculpe, ocorreu algum erro interno \n Código: reativar${modulo}/${id}`,
				);
			},
		});
	};

	return (
		<>
			<Modal
				show={statusReativarRegistro}
				onHide={() => setStatusReativarRegistro(false)}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Body>
					<p className="text-center"> Deseja realmente reativar este usuário? </p>
				</Modal.Body>

				<Modal.Footer>
					<button className="btn btn-danger" onClick={reativar} disabled={isLoading}>
						Sim
					</button>
					<button
						className="btn btn-primary"
						onClick={() => setStatusReativarRegistro(false)}
						disabled={isLoading}
					>
						Não
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Reativar;
