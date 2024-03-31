import { Container } from 'react-bootstrap';
import Compose from '../Compose/Compose';
import SideNav from './SideNav';
import { Route, Routes } from 'react-router';
import Inbox from '../Inbox/Inbox';

function Home() {
	return (
		<Container fluid className='d-flex p-0 min-vh-100 '>
			<SideNav />
			<Container fluid>
				<Routes>
					<Route path={'/compose' } element={<Compose />} />
					<Route path={'/inbox' } element={<Inbox />} />
				</Routes>
			</Container>
		</Container>
	)
}

export default Home