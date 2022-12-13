import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import UsuariosPage from '.';

describe('Testes da página Inicial', () => {
	it('Teste de snapshot', () => {
		const queryClient = new QueryClient();
		const { container } = render(
			<QueryClientProvider client={queryClient}>
				<UsuariosPage />
			</QueryClientProvider>,
		);

		expect(container).toMatchSnapshot();
	});
});
