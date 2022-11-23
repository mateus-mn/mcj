import { Modal } from 'react-bootstrap';
import { FormularioProps, GrupoForm } from './types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, faSave } from '@fortawesome/free-solid-svg-icons';
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
	// esquema de validação para o formulário
	const validacaoFormulario = yup
		.object({
			numero: yup
				.number()
				.required('Número inválido')
				.typeError('Número inválido')
				.min(1, 'Informe um número acima de zero'),
			nome: yup.string().required('Nome em branco'),
		})
		.required();

	// construtor do react-hook-form para validação do formulário
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<GrupoForm>({
		resolver: yupResolver(validacaoFormulario),
	});

	// hook para cadastro do grupo
	const { mutateAsync: cadastrarGrupo, isLoading: isLoadingCadastrarGrupo } = useAddGrupo();
	// hook para alteração do grupo
	const { mutateAsync: alterarGrupo, isLoading: isLoadingAlterarGrupo } = useAlterGrupo(
		grupo?.id,
	);

	const fecharFormulario = () => {
		setStatusFormulario(false);
		setGrupo(undefined);
		refetch();
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
					fecharFormulario();
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
					fecharFormulario();
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
				onHide={() => setStatusFormulario(false)}
				size="lg"
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						{' '}
						{grupo === undefined ? (
							<> Cadastrar novo grupo </>
						) : (
							<> Alterar grupo </>
						)}{' '}
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
										{' '}
										Número do grupo: <FontAwesomeIcon icon={faAsterisk} />{' '}
									</label>
									<input
										{...register('numero')}
										className={
											'form-control' + (errors.numero ? ' is-invalid' : '')
										}
										type="number"
										min="1"
										onBlur={setarNomeGrupo}
									/>
									<div className="invalid-feedback">
										{' '}
										{errors.numero?.message}{' '}
									</div>
								</div>
							</div>
							<div className="col-9">
								<div className="form-group mt-3">
									<label className="mb-1" htmlFor="nome">
										{' '}
										Nome: <FontAwesomeIcon icon={faAsterisk} />{' '}
									</label>
									<input
										{...register('nome')}
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
								<button
									disabled={isLoadingCadastrarGrupo || isLoadingAlterarGrupo}
									type="submit"
									className="btn btn-success mt-3"
								>
									<FontAwesomeIcon icon={faSave} /> Salvar
								</button>
							</div>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Formulario;
