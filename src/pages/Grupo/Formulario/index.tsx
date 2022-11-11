import { Modal } from "react-bootstrap"
import { FormularioProps } from "./types";

const Formulario = ({statusFormulario, setStatusFormulario}: FormularioProps) =>
{
	const fecharFormulario = () =>
	{
		setStatusFormulario (false);
	}
	
	return(
		<>
			<Modal
				show={statusFormulario}
				onHide={fecharFormulario}
				size="lg"
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title> Oie </Modal.Title>
				</Modal.Header>
						
				<Modal.Body>
						<p> Cara de boi </p>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default Formulario;