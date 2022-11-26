import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginPage from '.';

const mockLogin = jest.fn((login, senha) => {
	return Promise.resolve({ login, senha });
});

describe('App', () => {
	it('should display required error when value is invalid', async () => {
		const queryClient = new QueryClient();
		render(
			<QueryClientProvider client={queryClient}>
				<LoginPage />
			</QueryClientProvider>,
		);

		const botao = screen.getByRole('button');
		const mensagensErro = screen.findAllByRole('alert');

		fireEvent.submit(botao);

		expect(await mensagensErro).toHaveLength(2);
		expect(mockLogin).not.toBeCalled();
	});

	it('should display matching error when email is invalid', async () => {
		const queryClient = new QueryClient();
		render(
			<QueryClientProvider client={queryClient}>
				<LoginPage />
			</QueryClientProvider>,
		);

		const login = screen.getByRole('textbox', { name: /login/i });
		const senha = screen.getByRole('textbox', { name: /senha/i });
		const botao = screen.getByRole('button');

		fireEvent.input(login, {
			target: {
				value: '',
			},
		});

		fireEvent.input(senha, {
			target: {
				value: 'password',
			},
		});

		fireEvent.submit(botao);

		const mensagensErro = screen.findAllByRole('alert');
		expect(await mensagensErro).toHaveLength(1);
		expect(mockLogin).not.toBeCalled();
		expect(login.value).toBe('');
		expect(senha.value).toBe('password');
	});

	/*

	it('should display min length error when password is invalid', async () => {
		fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
			target: {
				value: 'test@mail.com',
			},
		});

		fireEvent.input(screen.getByLabelText('password'), {
			target: {
				value: 'pass',
			},
		});

		fireEvent.submit(screen.getByRole('button'));

		expect(await screen.findAllByRole('alert')).toHaveLength(1);
		expect(mockLogin).not.toBeCalled();
		expect(screen.getByRole('textbox', { name: /email/i }).value).toBe('test@mail.com');
		expect(screen.getByLabelText('password').value).toBe('pass');
	});

	it('should not display error when value is valid', async () => {
		fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
			target: {
				value: 'test@mail.com',
			},
		});

		fireEvent.input(screen.getByLabelText('password'), {
			target: {
				value: 'password',
			},
		});

		fireEvent.submit(screen.getByRole('button'));

		await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
		expect(mockLogin).toBeCalledWith('test@mail.com', 'password');
		expect(screen.getByRole('textbox', { name: /email/i }).value).toBe('');
		expect(screen.getByLabelText('password').value).toBe('');
	});
	*/
});
/*
import { act, fireEvent, render, screen } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from 'react-query';
import LoginPage from '.';

const mockHandleSubmit = jest.fn();
jest.mock(`react-hook-form`, () => ({
	...jest.requireActual(`react-hook-form`),
	useForm: () => ({
		handleSubmit: mockHandleSubmit,
		register: jest.fn(),
		formState: { errors: [] },
	}),
}));

describe('Testes da página de login', () => {
	it('Teste de snapshot', () => {
		const queryClient = new QueryClient();
		const { container } = render(
			<QueryClientProvider client={queryClient}>
				<LoginPage />
			</QueryClientProvider>,
		);

		expect(container).toMatchSnapshot();
	});

	it('Estado inicial do formulário', () => {
		const queryClient = new QueryClient();
		render(
			<QueryClientProvider client={queryClient}>
				<LoginPage />
			</QueryClientProvider>,
		);

		const login = screen.getByLabelText('Login');
		const senha = screen.getByLabelText('Senha');
		const botao = screen.getByRole('button');

		expect(login).toBeInTheDocument();
		expect(senha).toBeInTheDocument();
		expect(botao).toBeInTheDocument();

		expect(login).toHaveValue('');
		expect(senha).toHaveValue('');
		expect(botao).not.toBeDisabled();
	});

	it('Teste de login com usuário e senha em branco', () => {
		jest.useFakeTimers();
		const queryClient = new QueryClient();
		render(
			<QueryClientProvider client={queryClient}>
				<LoginPage />
			</QueryClientProvider>,
		);

		const login = screen.getByLabelText('Login');
		const botao = screen.getByRole('button');

		fireEvent.change(login, {
			target: {
				value: '',
			},
		});

		fireEvent.submit(botao);
		expect(mockHandleSubmit).toHaveBeenCalled();

		const errorMessages = screen.getAllByRole('alert');

		act(() => {
			jest.runAllTimers();
		});

		expect(errorMessages[0].textContent).toBe('Login em branco');
	});
});
*/
