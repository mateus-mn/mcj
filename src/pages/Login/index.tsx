import * as yup from 'yup';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import logoMcj from '../../images/logoMcj.png';
import { LoginForm } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAutenticar } from '../../services/autenticacao';
import { toast } from 'react-toastify';
import { Token } from '../../models/Token';

const LoginPage = () => {
    // esquema de validação para o formulário
    const validacaoFormulario = yup
        .object({
            login: yup
                .string()
                .required('Usuário em branco')
                .min(3, 'O usuário deve possuir ao menos três caracteres'),
            senha: yup
                .string()
                .required('Senha em branco')
                .min(3, 'A senha deve possuir ao menos três caracteres'),
        })
        .required();

    // construtor do react-hook-form para validação do formulário
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: yupResolver(validacaoFormulario),
    });

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
                        // seta o token como variável local no navegador
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
                                {' '}
                                Login <FontAwesomeIcon icon={faAsterisk} />{' '}
                            </label>
                            <input
                                {...register('login')}
                                className={'form-control' + (errors.login ? ' is-invalid' : '')}
                            />
                            <div className="invalid-feedback"> {errors.login?.message} </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="form-group">
                            <label htmlFor="senha">
                                {' '}
                                Senha <FontAwesomeIcon icon={faAsterisk} />{' '}
                            </label>
                            <input
                                {...register('senha')}
                                type="password"
                                className={'form-control' + (errors.senha ? ' is-invalid' : '')}
                            />
                            <div className="invalid-feedback"> {errors.senha?.message} </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-11 offset-1">
                        <button type="submit" className="btn btn-success mt-3" disabled={isLoading}>
                            {' '}
                            Login{' '}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
