import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginPage from '.';

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
});
