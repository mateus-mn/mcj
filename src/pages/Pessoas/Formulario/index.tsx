import { Modal } from 'react-bootstrap';
import { FormularioProps, PessoaForm } from './types';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, faFilterCircleXmark, faSave } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAddPessoa, useAlterPessoa } from '../../../services/pessoas';
import { useGetSexos } from '../../../services/sexos';
import InputMask from 'react-input-mask';

const Formulario = ({
	statusFormulario,
	setStatusFormulario,
	refetch,
	pessoa,
	setPessoa,
}: FormularioProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<PessoaForm>();

	const { data: sexos, isLoading: isLoadingSexos } = useGetSexos({
		refetchInterval: false,
		refetchOnWindowFocus: false,
		onError: () => toast.error('Desculpe, ocorreu algum erro interno \n Código: listarSexos'),
	});
	const { mutateAsync: cadastrarPessoa, isLoading: isLoadingCadastrarPessoa } = useAddPessoa();
	const { mutateAsync: alterarPessoa, isLoading: isLoadingAlterarPessoa } = useAlterPessoa(
		pessoa?.id,
	);

	const resetFormulario = () => {
		reset(
			{
				nome: '',
				sexo: '',
				dataNascimento: '',
				email: '',
				celular: '',
			},
			{ keepErrors: false },
		);
	};

	const fecharFormulario = (recarregarDados: boolean) => {
		setStatusFormulario(false);
		setPessoa(undefined);
		resetFormulario();

		if (recarregarDados) {
			refetch();
		}
	};

	const cadastrar = (data: PessoaForm) => {
		let celular = data['celular'];
		if (celular !== '') {
			celular = data['celular'];
		}

		cadastrarPessoa(
			{
				nome: data['nome'],
				sexo: data['sexo'],
				dataNascimento: data['dataNascimento'],
				email: data['email'],
				celular: celular,
			},
			{
				onSuccess: async () => {
					toast.success('Pessoa cadastrada com sucesso');
					fecharFormulario(true);
				},
				onError: async () => {
					toast.error('Desculpe, ocorreu algum erro interno \n Código: cadastrarPessoa');
				},
			},
		);
	};

	const alterar = (data: PessoaForm) => {
		alterarPessoa(
			{
				nome: data['nome'],
				sexo: data['sexo'],
				dataNascimento: data['dataNascimento'],
				email: data['email'],
				celular: data['celular'],
			},
			{
				onSuccess: async () => {
					toast.success('Pessoa alterada com sucesso');
					fecharFormulario(true);
				},
				onError: async () => {
					toast.error('Desculpe, ocorreu algum erro interno \n Código: alterarPessoa');
				},
			},
		);
	};

	useEffect(() => {
		pessoa === undefined ? setValue('nome', '') : setValue('nome', pessoa.nome);
		pessoa === undefined ? setValue('sexo', '') : setValue('sexo', pessoa.idSexo.toString());
		pessoa === undefined
			? setValue('dataNascimento', '')
			: setValue('dataNascimento', pessoa.dataNascimento);
		pessoa === undefined ? setValue('email', '') : setValue('email', pessoa?.email || '');
		pessoa === undefined ? setValue('celular', '') : setValue('celular', pessoa?.celular || '');
	}, [pessoa, setValue]);

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
						{pessoa === undefined ? (
							<> Cadastrar nova pessoa </>
						) : (
							<> Alterar pessoa </>
						)}
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form
						noValidate
						onSubmit={
							pessoa === undefined ? handleSubmit(cadastrar) : handleSubmit(alterar)
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
											required: 'Nome em branco',
											minLength: {
												value: 3,
												message:
													'O nome deve possuir ao menos três caracteres',
											},
										})}
										className={
											'form-control' + (errors.nome ? ' is-invalid' : '')
										}
									/>
									<div className="invalid-feedback"> {errors.nome?.message} </div>
								</div>
							</div>
							<div className="col-6">
								<div className="form-group mt-3">
									<label className="mb-1" htmlFor="sexo">
										Sexo: <FontAwesomeIcon icon={faAsterisk} />
									</label>
									<select
										id="sexo"
										{...register('sexo', {
											required: 'Selecione uma opção',
										})}
										className={
											'form-control' + (errors.sexo ? ' is-invalid' : '')
										}
									>
										<>
											{isLoadingSexos && (
												<option value="">Por favor aguarde</option>
											)}
											{!isLoadingSexos && (
												<>
													<option />
													{sexos?.map((item) => {
														return (
															<option key={item.id} value={item.id}>
																<>
																	{item.sigla} - {item.descricao}
																</>
															</option>
														);
													})}
												</>
											)}
										</>
									</select>
									<div className="invalid-feedback"> {errors.sexo?.message} </div>
								</div>
							</div>
							<div className="col-6">
								<div className="form-group mt-3">
									<label className="mb-1" htmlFor="dataNascimento">
										Data de nascimento: <FontAwesomeIcon icon={faAsterisk} />
									</label>
									<input
										id="dataNascimento"
										{...register('dataNascimento', {
											required: 'Data de nascimento inválida',
										})}
										className={
											'form-control' +
											(errors.dataNascimento ? ' is-invalid' : '')
										}
										type="date"
										max="3000-12-31"
									/>
									<div className="invalid-feedback">
										{errors.dataNascimento?.message}
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="form-group mt-3">
									<label htmlFor="email"> Email: </label>
									<input
										id="email"
										{...register('email', {
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
												message: 'E-mail inválido',
											},
										})}
										className={
											'form-control' + (errors.email ? ' is-invalid' : '')
										}
										type="email"
									/>
									<div className="invalid-feedback">{errors.email?.message}</div>
								</div>
							</div>
							<div className="col-6">
								<div className="form-group mt-3">
									<label htmlFor="celular"> Celular: </label>
									<InputMask
										mask="(99) 9 9999-9999"
										{...register('celular', {
											validate: {
												contemUnderlines: (value) =>
													value.search('_') === -1 ||
													'Número de celular inválido',
											},
										})}
										className={
											'form-control' + (errors.celular ? ' is-invalid' : '')
										}
									/>

									<div className="invalid-feedback">
										{errors.celular?.message}
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<div className="btn-group">
									<button
										disabled={
											isLoadingCadastrarPessoa || isLoadingAlterarPessoa
										}
										type="submit"
										className="btn btn-success btn-sm mt-3"
									>
										<FontAwesomeIcon icon={faSave} /> Salvar
									</button>
									<button
										disabled={
											isLoadingCadastrarPessoa || isLoadingAlterarPessoa
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
