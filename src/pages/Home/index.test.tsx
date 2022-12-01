import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from '.';

describe('Testes da página Home', () => {
	it('Teste de snapshot', () => {
		const queryClient = new QueryClient();
		const { container } = render(
			<QueryClientProvider client={queryClient}>
				<HomePage />
			</QueryClientProvider>,
		);

		expect(container).toMatchSnapshot();
	});
});
