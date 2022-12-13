import { Modal } from 'react-bootstrap';
import { FormularioProps, UsuarioForm } from './types';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, faFilterCircleXmark, faSave } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAddUsuario, useAlterUsuario } from '../../../services/usuarios';
import { useGetPerfis } from '../../../services/perfis';
import Carregando from '../../../components/Carregando';

const Formulario = ({
	statusFormulario,
	setStatusFormulario,
	refetch,
	usuario,
	setUsuario,
}: FormularioProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<UsuarioForm>();

	const { data: perfis, isLoading: isLoadingPerfis } = useGetPerfis({
		refetchInterval: false,
		refetchOnWindowFocus: false,
		onError: () => toast.error('Desculpe, ocorreu algum erro interno \n Código: listarPerfis'),
	});
	const { mutateAsync: cadastrarUsuario, isLoading: isLoadingCadastrarUsuario } = useAddUsuario();
	const { mutateAsync: alterarUsuario, isLoading: isLoadingAlterarUsuario } = useAlterUsuario(
		usuario?.id,
	);

	const resetFormulario = () => {
		reset(
			{
				nome: '',
				login: '',
				// seta uma senha qualquer apenas para passar na validação do formulário em caso de edição
				senha: usuario === undefined ? '' : '123456',
				perfis: [],
			},
			{ keepErrors: false },
		);
	};

	const fecharFormulario = (recarregarDados: boolean) => {
		setStatusFormulario(false);
		setUsuario(undefined);
		resetFormulario();

		if (recarregarDados) {
			refetch();
		}
	};

	const cadastrar = (data: UsuarioForm) => {
		cadastrarUsuario(
			{
				nome: data['nome'],
				login: data['login'],
				senha: data['senha'],
				perfis: data['perfis'],
			},
			{
				onSuccess: async () => {
					toast.success('Usuário cadastrado com sucesso');
					fecharFormulario(true);
				},
				onError: async (error) => {
					if (error.response?.status === 409) {
						toast.warn('Este usuário já está cadastrado para outra pessoa');
						return;
					}

					toast.error('Desculpe, ocorreu algum erro interno \n Código: cadastrarUsuário');
				},
			},
		);
	};

	const alterar = (data: UsuarioForm) => {
		alterarUsuario(
			{
				nome: data['nome'],
				login: data['login'],
				perfis: data['perfis'],
			},
			{
				onSuccess: async () => {
					toast.success('Usuário alterado com sucesso');
					fecharFormulario(true);
				},
				onError: async (error) => {
					if (error.response?.status === 409) {
						toast.warn('Este usuário já está cadastrado para outra pessoa');
						return;
					}

					toast.error(
						`Desculpe, ocorreu algum erro interno \n Código: alterarUsuário${usuario?.id}`,
					);
				},
			},
		);
	};

	useEffect(() => {
		if (usuario === undefined) {
			setValue('nome', '');
			setValue('login', '');
			setValue('perfis', []);
			setValue('senha', '');
		} else {
			let perfis: string[] = [];
			usuario.perfis.forEach((item) => perfis.push(item.id.toString()));

			setValue('nome', usuario.nome);
			setValue('login', usuario.login);
			setValue('perfis', perfis);
			// seta uma senha qualquer apenas para passar na validação do formulário em caso de edição
			setValue('senha', '123456');
		}
	}, [usuario, setValue]);

	return (
		<>
			<Modal
				show={statusFormulario}
				onHide={() => fecharFormulario(false)}
				size="lg"
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						{usuario === undefined ? (
							<> Cadastrar novo usuário </>
						) : (
							<> Alterar usuário </>
						)}
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form
						noValidate
						onSubmit={
							usuario === undefined ? handleSubmit(cadastrar) : handleSubmit(alterar)
						}
					>
						<div className="row">
							<div className="col-12">
								<div className="form-group mt-3">
									<label className="mb-1" htmlFor="nome">
										Nome: <FontAwesomeIcon icon={faAsterisk} />
									</label>
									<input
										id="nome"
										{...register('nome', {
											required: { value: true, message: 'Nome em branco' },
											minLength: {
												value: 3,
												message:
													'O nome deve possuir ao menos três caracteres',
											},
										})}
										className={
											'form-control' + (errors.nome ? ' is-invalid' : '')
										}
										aria-invalid={errors.nome ? true : false}
									/>
									<div className="invalid-feedback"> {errors.nome?.message} </div>
								</div>
							</div>

							<div className="col-12">
								<div className="form-group mt-3">
									<label className="mb-1" htmlFor="login">
										Login: <FontAwesomeIcon icon={faAsterisk} />
									</label>
									<input
										id="login"
										{...register('login', {
											required: {
												value: true,
												message: 'Login em branco',
											},
											minLength: {
												value: 3,
												message:
													'O login deve possuir ao menos três caracteres',
											},
										})}
										className={
											'form-control' + (errors.login ? ' is-invalid' : '')
										}
										aria-invalid={errors.login ? true : false}
									/>
									<div className="invalid-feedback">{errors.login?.message}</div>
								</div>
							</div>
							{usuario === undefined && (
								<div className="col-12">
									<div className="form-group mt-3">
										<label className="mb-1" htmlFor="senha">
											Senha: <FontAwesomeIcon icon={faAsterisk} />
										</label>
										<input
											id="senha"
											{...register('senha', {
												required: {
													value: true,
													message: 'Senha em branco',
												},
												minLength: {
													value: 3,
													message:
														'A senha deve possuir ao menos três caracteres',
												},
											})}
											className={
												'form-control' + (errors.senha ? ' is-invalid' : '')
											}
											aria-invalid={errors.senha ? true : false}
											type="password"
										/>
										<div className="invalid-feedback">
											{errors.senha?.message}
										</div>
									</div>
								</div>
							)}
							<div className="col-6">
								<div className="form-group mt-3">
									<p>
										Selecione ao menos um perfil:{' '}
										<FontAwesomeIcon icon={faAsterisk} />
									</p>
									{isLoadingPerfis && <Carregando />}
									{!isLoadingPerfis && (
										<>
											{perfis?.map((item) => {
												return (
													<>
														<div className="form-check form-check-inline">
															<input
																{...register('perfis', {
																	validate: {
																		aoMenosUmaSelecionada: (
																			value,
																		) => value.length > 0,
																	},
																})}
																className={
																	'form-check-input' +
																	(errors.perfis
																		? ' is-invalid'
																		: '')
																}
																type="checkbox"
																id={`perfil${item.id}`}
																value={item.id}
															/>
															<label
																className="form-check-label"
																htmlFor={`perfil${item.id}`}
															>
																{item.descricao}
															</label>
														</div>
													</>
												);
											})}
										</>
									)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<div className="btn-group">
									<button
										disabled={
											isLoadingCadastrarUsuario || isLoadingAlterarUsuario
										}
										type="submit"
										className="btn btn-success btn-sm mt-3"
									>
										<FontAwesomeIcon icon={faSave} /> Salvar
									</button>
									<button
										disabled={
											isLoadingCadastrarUsuario || isLoadingAlterarUsuario
										}
										type="button"
										className="btn btn-warning btn-sm mt-3"
										onClick={resetFormulario}
									>
										<FontAwesomeIcon icon={faFilterCircleXmark} /> Limpar
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

export default Formulario;
