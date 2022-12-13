import { faEdit, faEye, faKey, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { KeyboardEvent, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTable, { TableColumn } from 'react-data-table-component';

import { paginacaoDatatables } from '../../../constants/global';
import { Usuario } from '../../../models/Usuario';
import Desativar from '../Desativar';
import Detalhar from '../Detalhar';
import FormularioAlterarSenha from '../FormularioAlterarSenha';
import Reativar from '../Reativar';
import { ColunasTabela, TabelaProps } from './types';

const Tabela = ({ usuarios, usuario, refetch, setUsuario, setStatusFormulario }: TabelaProps) => {
	// controle para filtrar a tabela com os elementos
	const [filtroUsuarios, setFiltroUsuarios] = useState<Usuario[] | undefined>(usuarios);
	// controle para exibir e ocultar o modal para visualizar os dados de um usuário
	const [statusModalDetalhar, setStatusModalDetalhar] = useState<boolean>(false);
	// controle para exibir e ocultar o modal para alterar a senha de um usuário
	const [statusFormularioAlterarSenha, setStatusFormularioAlterarSenha] =
		useState<boolean>(false);
	// controle para exibir e ocultar o modal para desativar um registro
	const [statusDesativarRegistro, setStatusDesativarRegistro] = useState<boolean>(false);
	// controle para exibir e ocultar o modal para reativar um registro
	const [statusReativarRegistro, setStatusReativarRegistro] = useState<boolean>(false);

	const filtrarItens = (e: KeyboardEvent<HTMLInputElement>) => {
		const valorFiltro = e.currentTarget.value;

		// se o tamanho do filtro for zero, não filtra nada, ou seja, exibe todos os valores
		if (valorFiltro.length === 0) {
			setFiltroUsuarios(usuarios);
			return;
		}

		const filtro = usuarios?.filter(
			(item) =>
				item.id === parseInt(valorFiltro) ||
				item.nome.toUpperCase().includes(valorFiltro.toUpperCase()) ||
				item.login.toUpperCase().includes(valorFiltro.toUpperCase()) ||
				item.ativo === (valorFiltro.toUpperCase() === 'SIM' ? true : false),
		);

		// se o filtro não retornar nada, seta um objeto vazio para que na tabela nada seja exibido
		if (filtro === undefined) {
			setFiltroUsuarios([]);
			return;
		}

		setFiltroUsuarios(filtro);
	};

	const detalhar = (id: number) => {
		const elemento = usuarios?.find((item) => item.id === id);
		setUsuario(elemento);
		setStatusModalDetalhar(true);
	};

	const editar = (id: number) => {
		const elemento = usuarios?.find((item) => item.id === id);
		setUsuario(elemento);
		setStatusFormulario(true);
	};

	const alterarSenha = (id: number) => {
		const elemento = usuarios?.find((item) => item.id === id);
		setUsuario(elemento);
		setStatusFormularioAlterarSenha(true);
	};

	const desativar = (id: number) => {
		const elemento = usuarios?.find((item) => item.id === id);
		setUsuario(elemento);
		setStatusDesativarRegistro(true);
	};

	const reativar = (id: number) => {
		const elemento = usuarios?.find((item) => item.id === id);
		setUsuario(elemento);
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
			id: 'login',
			name: 'LOGIN',
			selector: (row) => row.login,
			sortable: true,
		},
		{
			id: 'perfis',
			name: 'PERFIS',
			selector: (row) => {
				let perfis: string[] = [];
				row.perfis.forEach((item) => perfis.push(item.descricao));
				return perfis.join(', ');
			},
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
								Visualizar os dados deste usuário
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
							overlay={<Tooltip> Editar este usuário </Tooltip>}
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
									Para editar este usuário, é necessário reativá-lo antes
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
							overlay={<Tooltip> Alterar a senha deste usuário </Tooltip>}
						>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => alterarSenha(row.id)}
							>
								<FontAwesomeIcon icon={faKey} />
							</button>
						</OverlayTrigger>
					) : (
						<OverlayTrigger
							placement="left"
							delay={{ show: 250, hide: 250 }}
							overlay={
								<Tooltip id="tooltip-disabled">
									Para alterar a senha deste usuário, é necessário reativá-lo
									antes
								</Tooltip>
							}
						>
							<button disabled type="button" className="btn btn-primary">
								<FontAwesomeIcon icon={faKey} />
							</button>
						</OverlayTrigger>
					)}

					{row.ativo === true ? (
						<OverlayTrigger
							placement="left"
							delay={{ show: 250, hide: 250 }}
							overlay={<Tooltip> Desativar este usuário </Tooltip>}
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
							overlay={<Tooltip> Reativar este usuário </Tooltip>}
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
			{usuarios !== undefined && usuarios?.length !== 0 && (
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

			{filtroUsuarios !== undefined && (
				<>
					<DataTable
						columns={colunas}
						data={filtroUsuarios}
						noDataComponent="Sem registros localizados"
						pagination
						paginationComponentOptions={paginacaoDatatables}
						striped={true}
						responsive={true}
					/>

					<FormularioAlterarSenha
						statusFormularioAlterarSenha={statusFormularioAlterarSenha}
						setStatusFormularioAlterarSenha={setStatusFormularioAlterarSenha}
						usuario={usuario}
						setUsuario={setUsuario}
					/>

					<Detalhar
						usuario={usuario}
						setUsuario={setUsuario}
						statusModalDetalhar={statusModalDetalhar}
						setStatusModalDetalhar={setStatusModalDetalhar}
					/>

					<Desativar
						id={usuario?.id}
						modulo="usuario"
						refetch={refetch}
						statusDesativarRegistro={statusDesativarRegistro}
						setStatusDesativarRegistro={setStatusDesativarRegistro}
					/>

					<Reativar
						id={usuario?.id}
						modulo="usuario"
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
