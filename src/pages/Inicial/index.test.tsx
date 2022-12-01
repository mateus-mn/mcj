import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import InicialPage from '.';

describe('Testes da página Inicial', () => {
	it('Teste de snapshot', () => {
		const queryClient = new QueryClient();
		const { container } = render(
			<QueryClientProvider client={queryClient}>
				<InicialPage />
			</QueryClientProvider>,
		);

		expect(container).toMatchSnapshot();
	});
});
