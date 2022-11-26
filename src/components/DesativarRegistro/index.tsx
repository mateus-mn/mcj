import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDesativarRegistro } from '../../services/desativarRegistro';
import { DesativarRegistroProps } from './types';

const DesativarRegistro = ({
	id,
	modulo,
	refetch,
	statusDesativarRegistro,
	setStatusDesativarRegistro,
}: DesativarRegistroProps) => {
	const { mutate, isLoading } = useDesativarRegistro(id, modulo);

	const desativar = () => {
		mutate(null, {
			onSuccess: async () => {
				toast.success('Desativado com sucesso');
				refetch();
				setStatusDesativarRegistro(false);
			},
			onError: async () => {
				toast.error(
					`Desculpe, ocorreu algum erro interno \n Código: desativar${modulo}/${id}`,
				);
			},
		});
	};

	return (
		<>
			<Modal
				show={statusDesativarRegistro}
				onHide={() => setStatusDesativarRegistro(false)}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Body>
					<p className="text-center"> Deseja realmente desativar este registro? </p>
				</Modal.Body>

				<Modal.Footer>
					<button className="btn btn-danger" onClick={desativar} disabled={isLoading}>
						{' '}
						Sim{' '}
					</button>
					<button
						className="btn btn-primary"
						onClick={() => setStatusDesativarRegistro(false)}
						disabled={isLoading}
					>
						{' '}
						Não{' '}
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default DesativarRegistro;
