import { faEdit, faEye, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { KeyboardEvent, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTable, { TableColumn } from 'react-data-table-component';
import { paginacaoDatatables } from '../../../constants/global';
import { Pessoa } from '../../../models/Pessoa';
import Desativar from '../Desativar';
import Detalhar from '../Detalhar';
import Reativar from '../Reativar';
import { ColunasTabela, TabelaProps } from './types';

const Tabela = ({ pessoas, pessoa, refetch, setPessoa, setStatusFormulario }: TabelaProps) => {
	// controle para filtrar a tabela com os elementos
	const [filtroPessoas, setFiltroPessoas] = useState<Pessoa[] | undefined>(pessoas);
	// controle para exibir e ocultar o modal para visualizar os dados de uma pessoa
	const [statusModalDetalhar, setStatusModalDetalhar] = useState<boolean>(false);
	// controle para exibir e ocultar o modal para desativar um registro
	const [statusDesativarRegistro, setStatusDesativarRegistro] = useState<boolean>(false);
	// controle para exibir e ocultar o modal para reativar um registro
	const [statusReativarRegistro, setStatusReativarRegistro] = useState<boolean>(false);

	const filtrarItens = (e: KeyboardEvent<HTMLInputElement>) => {
		const valorFiltro = e.currentTarget.value;

		// se o tamanho do filtro for zero, não filtra nada, ou seja, exibe todos os valores
		if (valorFiltro.length === 0) {
			setFiltroPessoas(pessoas);
			return;
		}

		const filtro = pessoas?.filter(
			(item) =>
				item.id === parseInt(valorFiltro) ||
				item.nome.toUpperCase().includes(valorFiltro.toUpperCase()) ||
				item.descricaoSexo.toUpperCase().includes(valorFiltro.toUpperCase()) ||
				item.dataNascimento.includes(valorFiltro) ||
				item.ativo === (valorFiltro.toUpperCase() === 'SIM' ? true : false),
		);

		// se o filtro não retornar nada, seta um objeto vazio para que na tabela nada seja exibido
		if (filtro === undefined) {
			setFiltroPessoas([]);
			return;
		}

		setFiltroPessoas(filtro);
	};

	const detalhar = (id: number) => {
		const elemento = pessoas?.find((item) => item.id === id);
		setPessoa(elemento);
		setStatusModalDetalhar(true);
	};

	const editar = (id: number) => {
		const elemento = pessoas?.find((item) => item.id === id);
		setPessoa(elemento);
		setStatusFormulario(true);
	};

	const desativar = (id: number) => {
		const elemento = pessoas?.find((item) => item.id === id);
		setPessoa(elemento);
		setStatusDesativarRegistro(true);
	};

	const reativar = (id: number) => {
		const elemento = pessoas?.find((item) => item.id === id);
		setPessoa(elemento);
		setStatusReativarRegistro(true);
	};

	// colunas para a tabela do Datatables
	const colunas: TableColumn<ColunasTabela>[] = [
		{
			id: 'ativo',
			name: 'ATIVO',
			selector: (row) => (row.ativo === true ? 'Sim' : 'Não'),
			sortable: true,
		},
		{
			id: 'id',
			name: 'ID',
			selector: (row) => row.id,
			sortable: true,
		},
		{
			id: 'nome',
			name: 'NOME',
			selector: (row) => row.nome,
			sortable: true,
		},
		{
			id: 'dataNascimento',
			name: 'DATA DE NASCIMENTO',
			selector: (row) => moment(row.dataNascimento).format('DD/MM/YYYY'),
			sortable: true,
		},
		{
			id: 'descricaoSexo',
			name: 'SEXO',
			selector: (row) => row.descricaoSexo,
			sortable: true,
		},
		{
			id: 'opcoes',
			name: 'OPÇÕES',
			sortable: false,
			cell: (row) => [
				<div key={row.id} className="btn-group" role="group" aria-label="Opções">
					<OverlayTrigger
						placement="left"
						delay={{ show: 250, hide: 250 }}
						overlay={
							<Tooltip id="tooltip-disabled">
								Visualizar os dados desta pessoa
							</Tooltip>
						}
					>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => detalhar(row.id)}
						>
							<FontAwesomeIcon icon={faEye} />
						</button>
					</OverlayTrigger>

					{row.ativo === true ? (
						<OverlayTrigger
							placement="left"
							delay={{ show: 250, hide: 250 }}
							overlay={<Tooltip> Editar esta pessoa </Tooltip>}
						>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => editar(row.id)}
							>
								<FontAwesomeIcon icon={faEdit} />
							</button>
						</OverlayTrigger>
					) : (
						<OverlayTrigger
							placement="left"
							delay={{ show: 250, hide: 250 }}
							overlay={
								<Tooltip id="tooltip-disabled">
									Para editar esta pessoa, é necessário reativá-la antes
								</Tooltip>
							}
						>
							<button disabled type="button" className="btn btn-primary">
								<FontAwesomeIcon icon={faEdit} />
							</button>
						</OverlayTrigger>
					)}

					{row.ativo === true ? (
						<OverlayTrigger
							placement="left"
							delay={{ show: 250, hide: 250 }}
							overlay={<Tooltip> Desativar esta pessoa </Tooltip>}
						>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => desativar(row.id)}
							>
								<FontAwesomeIcon icon={faToggleOn} />
							</button>
						</OverlayTrigger>
					) : (
						<OverlayTrigger
							placement="left"
							delay={{ show: 250, hide: 250 }}
							overlay={<Tooltip> Reativar esta pessoa </Tooltip>}
						>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => reativar(row.id)}
							>
								<FontAwesomeIcon icon={faToggleOff} />
							</button>
						</OverlayTrigger>
					)}
				</div>,
			],
		},
	];

	return (
		<>
			{/* campo de filtro da tabela */}
			{pessoas !== undefined && pessoas?.length !== 0 && (
				<div className="row">
					<div className="col-3 offset-9">
						<input
							type="text"
							className="form-control"
							placeholder="Filtrar"
							onKeyUp={filtrarItens}
						/>
					</div>
				</div>
			)}

			{filtroPessoas !== undefined && (
				<>
					<DataTable
						columns={colunas}
						data={filtroPessoas}
						noDataComponent="Sem registros localizados"
						pagination
						paginationComponentOptions={paginacaoDatatables}
						striped={true}
						responsive={true}
					/>

					<Detalhar
						pessoa={pessoa}
						setPessoa={setPessoa}
						statusModalDetalhar={statusModalDetalhar}
						setStatusModalDetalhar={setStatusModalDetalhar}
					/>

					<Desativar
						id={pessoa?.id}
						modulo="pessoa"
						refetch={refetch}
						statusDesativarRegistro={statusDesativarRegistro}
						setStatusDesativarRegistro={setStatusDesativarRegistro}
					/>

					<Reativar
						id={pessoa?.id}
						modulo="pessoa"
						refetch={refetch}
						statusReativarRegistro={statusReativarRegistro}
						setStatusReativarRegistro={setStatusReativarRegistro}
					/>
				</>
			)}
		</>
	);
};

export default Tabela;
