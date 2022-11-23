import { render } from '@testing-library/react';
import App from './App';

test('Teste do snapshot da página', () => {
	// renderiza o elemento
	const { container } = render(<App />);

	// espera-se que o snapshot seja o mesmo da página
	expect(container).toMatchSnapshot();
});
