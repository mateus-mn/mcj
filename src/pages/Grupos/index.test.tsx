import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import GruposPage from '.';

describe('Testes da página de Grupos', () => {
	it('Teste de snapshot', () => {
		const queryClient = new QueryClient();
		const { container } = render(
			<QueryClientProvider client={queryClient}>
				<GruposPage />
			</QueryClientProvider>,
		);

		expect(container).toMatchSnapshot();
	});
});
