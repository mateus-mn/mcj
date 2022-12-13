import { Modal } from 'react-bootstrap';
import { AlterarSenhaForm, FormularioAlterarSenhaProps } from './types';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, faSave } from '@fortawesome/free-solid-svg-icons';

import { toast } from 'react-toastify';
import { useAlterSenha } from '../../../services/usuarios';

const FormularioAlterarSenha = ({
	statusFormularioAlterarSenha,
	setStatusFormularioAlterarSenha,
	usuario,
	setUsuario,
}: FormularioAlterarSenhaProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AlterarSenhaForm>();

	const { mutateAsync, isLoading } = useAlterSenha(usuario?.id);

	const resetFormulario = () => {
		reset(
			{
				novaSenha: '',
			},
			{ keepErrors: false },
		);
	};

	const fecharFormulario = () => {
		setStatusFormularioAlterarSenha(false);
		setUsuario(undefined);
		resetFormulario();
	};

	const alterarSenha = (data: AlterarSenhaForm) => {
		mutateAsync(
			{
				novaSenha: data['novaSenha'],
			},
			{
				onSuccess: async () => {
					toast.success('Senha alterada com sucesso');
					fecharFormulario();
				},
				onError: async () => {
					toast.error(
						`Desculpe, ocorreu algum erro interno \n Código: alterarSenhaUsuário{$id}`,
					);
				},
			},
		);
	};

	return (
		<>
			<Modal
				show={statusFormularioAlterarSenha}
				onHide={fecharFormulario}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Alterar a senha do usuário</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form noValidate onSubmit={handleSubmit(alterarSenha)}>
						<div className="row">
							<div className="col-12">
								<div className="form-group mt-3">
									<label className="mb-1" htmlFor="novaSenha">
										Digite a nova senha: <FontAwesomeIcon icon={faAsterisk} />
									</label>
									<input
										id="senha"
										{...register('novaSenha', {
											required: {
												value: true,
												message: 'Nova senha em branco',
											},
											minLength: {
												value: 3,
												message:
													'A nova senha deve possuir ao menos três caracteres',
											},
										})}
										className={
											'form-control' + (errors.novaSenha ? ' is-invalid' : '')
										}
										type="password"
									/>
									<div className="invalid-feedback">
										{errors.novaSenha?.message}
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<div className="btn-group">
									<button
										disabled={isLoading}
										type="submit"
										className="btn btn-success btn-sm mt-3"
									>
										<FontAwesomeIcon icon={faSave} /> Alterar
									</button>
								</div>
							</div>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default FormularioAlterarSenha;
