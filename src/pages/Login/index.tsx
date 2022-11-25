import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import logoMcj from '../../images/logoMcj.png';
import { LoginForm } from './types';
import { useAutenticar } from '../../services/autenticacao';
import { toast } from 'react-toastify';
import { Token } from '../../models/Token';

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();

	const { mutateAsync, isLoading } = useAutenticar();

	const logar = (data: LoginForm) => {
		mutateAsync(
			{
				login: data['login'],
				senha: data['senha'],
			},
			{
				onSuccess: async (data: Token) => {
					toast.dark(`Logado com sucesso`);

					setTimeout(() => {
						sessionStorage.setItem('idUsuario', data.idUsuario.toString());
						sessionStorage.setItem('nomeUsuario', data.nomeUsuario);
						sessionStorage.setItem('tokenUsuario', data.token);

						window.location.href = '/home';
					}, 1000);
				},
				onError: async () => {
					toast.warn('Usuário ou senha incorretos');
				},
			},
		);
	};

	return (
		<div className="container mt-3">
			<div className="row">
				<div className="col-11 offset-1">
					<h1>
						Login
						<img src={logoMcj} alt="Logo do MCJ" width={50} />
					</h1>
				</div>
			</div>

			<form noValidate onSubmit={handleSubmit(logar)}>
				<div className="row mt-3">
					<div className="col-5 offset-1">
						<div className="form-group">
							<label htmlFor="login">
								Login <FontAwesomeIcon icon={faAsterisk} />
							</label>
							<input
								id="login"
								{...register('login', {
									required: 'Login em branco',
									minLength: {
										value: 3,
										message: 'O Login deve possuir ao menos três caracteres',
									},
								})}
								className={'form-control' + (errors.login ? ' is-invalid' : '')}
							/>
							{errors.login && (
								<div role="alert" className="invalid-feedback">
									{errors.login.message}
								</div>
							)}
						</div>
					</div>
					<div className="col-5">
						<div className="form-group">
							<label htmlFor="senha">
								Senha <FontAwesomeIcon icon={faAsterisk} />
							</label>
							<input
								id="senha"
								{...register('senha', {
									required: 'Senha em branco',
									minLength: {
										value: 3,
										message: 'A senha deve possuir ao menos três caracteres',
									},
								})}
								type="password"
								className={'form-control' + (errors.senha ? ' is-invalid' : '')}
							/>
							{errors.senha && (
								<div role="alert" className="invalid-feedback">
									{errors.senha?.message}
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-11 offset-1">
						<button type="submit" className="btn btn-success mt-3" disabled={isLoading}>
							Acessar
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
