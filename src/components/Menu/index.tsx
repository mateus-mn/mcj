import { faHome, faRightFromBracket, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, Navbar } from 'react-bootstrap';

const Menu = () => {
	const logout = () => {
		sessionStorage.clear();

		window.location.href = '/';
	};

	return (
		<>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand className="ms-3" href="/home">
					{' '}
					MCJ{' '}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="menuPrincipal" />
				<Navbar.Collapse id="menuPrincipal">
					<Nav className="me-auto">
						<Nav.Link active href="/home">
							{' '}
							<FontAwesomeIcon icon={faHome} /> Home{' '}
						</Nav.Link>
						<Nav.Link active href="/grupos">
							{' '}
							<FontAwesomeIcon icon={faUsers} /> Grupos{' '}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<Nav>
					<Nav.Link className="me-3" active href="/" onClick={logout}>
						{' '}
						<FontAwesomeIcon icon={faRightFromBracket} /> Sair{' '}
					</Nav.Link>
				</Nav>
			</Navbar>
		</>
	);
};

export default Menu;
