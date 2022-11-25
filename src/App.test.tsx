import { render } from '@testing-library/react';
import App from './App';

describe('Testes do componente principal', () => {
	it('Teste de snapshot', () => {
		const { container } = render(<App />);

		// espera-se que o snapshot seja o mesmo da página
		expect(container).toMatchSnapshot();
	});
});
