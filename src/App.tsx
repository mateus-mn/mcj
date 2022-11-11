import { QueryClient, QueryClientProvider } from "react-query";
import ToastAlert from "./components/ToastAlert";
import GruposPage from "./pages/Grupo";

const App = () =>
{
	// seta o query Client para conseguir usar o React Query
	const queryClient = new QueryClient();

	return(
		<>
			<QueryClientProvider client={queryClient}>
				<GruposPage />
			</QueryClientProvider>

			{/* Inclui o toast que irá exibir todas as mensagens de alerta, erro, sucesso... nas páginas */}
			<ToastAlert />
		</>
	);
}

export default App;