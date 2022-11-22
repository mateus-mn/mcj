import { faEdit, faEye, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyboardEvent, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import DesativarRegistro from "../../../components/DesativarRegistro";
import { paginacaoDatatables } from "../../../constants/global";
import { Grupo } from "../../../models/Grupo";
import Detalhar from "../Detalhar";
import { ColunasTabela, TabelaProps } from "./types";

const Tabela = ({grupos, grupo, refetch, setGrupo, setStatusFormulario} : TabelaProps) =>
{
	// controle para filtrar a tabela com os elementos
	const [filtroGrupos, setFiltroGrupos] = useState<Grupo[] | undefined>(grupos);

	// controle para exibir e ocultar o modal para visualizar os dados de um grupo
	const [statusModalDetalhar, setStatusModalDetalhar] = useState<boolean>(false);

	// controle para exibir e ocultar o modal para desativar um registro
	const [statusDesativarRegistro, setStatusDesativarRegistro] = useState<boolean>(false);

	const filtrarItens = (e : KeyboardEvent<HTMLInputElement>) =>
	{
		const valorFiltro = e.currentTarget.value;

		// se o tamanho do filtro for zero, não filtra nada, ou seja, exibe todos os valores
		if (valorFiltro.length === 0)
		{
			setFiltroGrupos (grupos);
			return;
		}

		const filtro = grupos?.filter ((item) =>
			item.id === parseInt (valorFiltro)
			||
			item.numero === parseInt (valorFiltro)
			||
			item.nome.toUpperCase ().includes (valorFiltro.toUpperCase ())
			||
			item.ativo === (valorFiltro.toUpperCase () === "SIM" ? true : false)
		);

		// se o filtro não retornar nada, seta um objeto vazio para que na tabela nada seja exibido
		if (filtro === undefined)
		{
			setFiltroGrupos ([]);
			return;
		}
		
		setFiltroGrupos (filtro);
	}

	const detalhar = (id : number) =>
	{
		const elemento = grupos?.find ((item) => item.id === id);
		setGrupo (elemento);
		setStatusModalDetalhar (true);
	}

	const editar = (id : number) =>
	{
		const elemento = grupos?.find ((item) => item.id === id);
		setGrupo (elemento);
		setStatusFormulario (true);
	}

	const desativar = (id : number) =>
	{
		const elemento = grupos?.find ((item) => item.id === id);
		setGrupo (elemento);
		setStatusDesativarRegistro (true);
	}

	const reativar = (id : number) =>
	{
		// filtra o grupo para enviar para o modal os dados
		//const elemento = grupos.find ((item) => item.id === id);

		// seta no estado para acesso posterior
		//setGrupo (elemento);

		// abre o modal de confirmação de desativação
		//setStatusReativarRegistro (true);
	}

	// colunas para a tabela do Datatables
	const colunas : TableColumn<ColunasTabela>[] =
	[{
		id   : "ativo",
		name : "ATIVO",
		selector: row => row.ativo === true ? "Sim" : "Não",
		sortable: true
	},
	{
		id   : "id",
		name : "ID",
		selector: row => row.id,
		sortable: true
	},
	{
		id   : "numero",
		name : "NÚMERO",
		selector: row => row.numero,
		sortable: true
	},
	{
		id   : "nome",
		name : "NOME",
		selector: row => row.nome,
		sortable: true
	},
	{
		id: "opcoes",
		name: "OPÇÕES",
		sortable: false,
		cell: (row) =>
		[
			<div key={row.id} className="btn-group" role="group" aria-label="Opções">
				<OverlayTrigger
					placement="left"
					delay={{ show: 250, hide: 250 }}
					overlay={<Tooltip id="tooltip-disabled"> Visualizar os dados deste grupo </Tooltip>}
				>
					<button type="button" className="btn btn-primary" onClick={() => detalhar (row.id)}> <FontAwesomeIcon icon={faEye} /> </button>
				</OverlayTrigger>
				
				{row.ativo === true
				?
					<div>
						<OverlayTrigger
							placement="left"
							delay={{ show: 250, hide: 250 }}
							overlay={<Tooltip> Editar este grupo </Tooltip>}
						>
							<button type="button" className="btn btn-primary" onClick={() => editar (row.id)}> <FontAwesomeIcon icon={faEdit} /> </button>
						</OverlayTrigger>
					</div>
				:
					<div>
						<OverlayTrigger
							placement="left"
							delay={{ show: 250, hide: 250 }}
							overlay={<Tooltip id="tooltip-disabled"> Para editar este grupo, é necessário reativá-lo antes </Tooltip>}
						>
							<span className="d-inline-block">
								<button disabled type="button" className="btn btn-primary"> <FontAwesomeIcon icon={faEdit} /> </button>
							</span>
						</OverlayTrigger>
					</div>	
				}

				{row.ativo === true
				?
					<div>
						<OverlayTrigger
							placement="left"
							delay={{ show: 250, hide: 250 }}
							overlay={<Tooltip> Desativar este grupo </Tooltip>}
						>
							<button type="button" className="btn btn-primary" onClick={() => desativar (row.id)}> <FontAwesomeIcon icon={faToggleOn} /> </button>
						</OverlayTrigger>
					</div>
				:
					<div>
						<OverlayTrigger
							placement="left"
							delay={{ show: 250, hide: 250 }}
							overlay={<Tooltip> Reativar este grupo </Tooltip>}
						>
							<button type="button" className="btn btn-primary" onClick={() => reativar (row.id)}> <FontAwesomeIcon icon={faToggleOff} /> </button>
						</OverlayTrigger>
					</div>
				}
			</div>
		]
	}];

	return (
		<>
			{/* campo de filtro da tabela */}
			{grupos !== undefined && grupos?.length !== 0 &&
				<div className="row">
					<div className="col-3 offset-9">
						<input type="text" className="form-control" placeholder="Filtrar" onKeyUp={filtrarItens} />
					</div>
				</div>
			}

			{filtroGrupos !== undefined &&
				<>
					<DataTable
						columns={colunas}
						data={filtroGrupos}
						noDataComponent="Sem registros localizados"
						pagination paginationComponentOptions={paginacaoDatatables}
						striped={true}
						responsive={true}
					/>

					<Detalhar
						grupo={grupo}
						setGrupo={setGrupo}
						statusModalDetalhar={statusModalDetalhar}
						setStatusModalDetalhar={setStatusModalDetalhar}
					/>

					<DesativarRegistro
						id={grupo?.id}
						modulo="grupo"
						refetch={refetch}
						statusDesativarRegistro={statusDesativarRegistro}
						setStatusDesativarRegistro={setStatusDesativarRegistro}
					/>
				</>
			}
		</>
	);
}

export default Tabela;