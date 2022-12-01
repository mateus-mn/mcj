import { Modal } from 'react-bootstrap';
import { FormularioProps, GrupoForm } from './types';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, faFilterCircleXmark, faSave } from '@fortawesome/free-solid-svg-icons';
import { FocusEvent, useEffect } from 'react';
import { useAddGrupo, useAlterGrupo } from '../../../services/grupos';
import { toast } from 'react-toastify';

const Formulario = ({
	statusFormulario,
	setStatusFormulario,
	refetch,
	grupo,
	setGrupo,
}: FormularioProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<GrupoForm>();

	const { mutateAsync: cadastrarGrupo, isLoading: isLoadingCadastrarGrupo } = useAddGrupo();
	const { mutateAsync: alterarGrupo, isLoading: isLoadingAlterarGrupo } = useAlterGrupo(
		grupo?.id,
	);

	const resetFormulario = () => {
		reset(
			{
				numero: 0,
				nome: '',
			},
			{ keepErrors: false },
		);
	};

	const fecharFormulario = (recarregarDados: boolean) => {
		setStatusFormulario(false);
		setGrupo(undefined);
		resetFormulario();

		if (recarregarDados) {
			refetch();
		}
	};

	const cadastrar = (data: GrupoForm) => {
		cadastrarGrupo(
			{
				numero: data['numero'],
				nome: data['nome'],
			},
			{
				onSuccess: async () => {
					toast.success('Grupo cadastrado com sucesso');
					fecharFormulario(true);
				},
				onError: async () => {
					toast.error('Desculpe, ocorreu algum erro interno \n Código: cadastrarGrupo');
				},
			},
		);
	};

	const alterar = (data: GrupoForm) => {
		alterarGrupo(
			{
				numero: data['numero'],
				nome: data['nome'],
			},
			{
				onSuccess: async () => {
					toast.success('Grupo alterado com sucesso');
					fecharFormulario(true);
				},
				onError: async () => {
					toast.error('Desculpe, ocorreu algum erro interno \n Código: alterarGrupo');
				},
			},
		);
	};

	// altera o campo nome do Grupo com uma string e o próprio número como um valor default do campo
	// somente quando é um novo cadastro
	// Ex.: Grupo 51
	const setarNomeGrupo = (event: FocusEvent<HTMLInputElement>) => {
		if (grupo === undefined) {
			const numero = event.target.value;

			if (numero !== '' && numero !== '0') {
				setValue('nome', `Grupo ${numero}`);
			}
		}
	};

	useEffect(() => {
		grupo === undefined ? setValue('numero', 0) : setValue('numero', grupo.numero);
		grupo === undefined ? setValue('nome', '') : setValue('nome', grupo.nome);
	}, [grupo, setValue]);

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
						{grupo === undefined ? <> Cadastrar novo grupo </> : <> Alterar grupo </>}
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form
						noValidate
						onSubmit={
							grupo === undefined ? handleSubmit(cadastrar) : handleSubmit(alterar)
						}
					>
						<div className="row">
							<div className="col-3">
								<div className="form-group mt-3">
									<label className="mb-1" htmlFor="numero">
										Número do grupo: <FontAwesomeIcon icon={faAsterisk} />
									</label>

									<input
										id="numero"
										{...register('numero', {
											required: { value: true, message: 'Número inválido' },
											min: {
												value: 1,
												message: 'Informe um número acima de zero',
											},
										})}
										className={
											'form-control' + (errors.numero ? ' is-invalid' : '')
										}
										type="number"
										onBlur={setarNomeGrupo}
									/>
									<div className="invalid-feedback">{errors.numero?.message}</div>
								</div>
							</div>
							<div className="col-9">
								<div className="form-group mt-3">
									<label className="mb-1" htmlFor="nome">
										Nome: <FontAwesomeIcon icon={faAsterisk} />
									</label>
									<input
										id="nome"
										{...register('nome', {
											required: { value: true, message: 'Nome em branco' },
										})}
										className={
											'form-control' + (errors.nome ? ' is-invalid' : '')
										}
									/>
									<div className="invalid-feedback"> {errors.nome?.message} </div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<div className="btn-group">
									<button
										disabled={isLoadingCadastrarGrupo || isLoadingAlterarGrupo}
										type="submit"
										className="btn btn-success btn-sm mt-3"
									>
										<FontAwesomeIcon icon={faSave} /> Salvar
									</button>
									<button
										disabled={isLoadingCadastrarGrupo || isLoadingAlterarGrupo}
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
