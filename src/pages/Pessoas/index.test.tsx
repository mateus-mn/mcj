import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PessoasPage from '.';

describe('Testes da página Pessoas', () => {
	it('Teste de snapshot', () => {
		const queryClient = new QueryClient();
		const { container } = render(
			<QueryClientProvider client={queryClient}>
				<PessoasPage />
			</QueryClientProvider>,
		);

		expect(container).toMatchSnapshot();
	});
});
