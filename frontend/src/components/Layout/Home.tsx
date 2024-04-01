import { Container } from 'react-bootstrap';
import Compose from '../Compose/Compose';
import SideNav from './SideNav';
import { Navigate, Route, Routes,  } from 'react-router';
import Inbox from '../Inbox/Inbox';
import Sent from '../Sent/Sent';

function Home() {
	return (
		<Container fluid className='d-flex p-0 min-vh-100 '>
			<SideNav />
			<Container fluid>
				<Routes>
					<Route path={'/compose' } element={<Compose />} />
					<Route path={'/inbox' } element={<Inbox />} />
					<Route path={'/sent' } element={<Sent />} />
					<Route path="*" element={<Navigate to="/auth" replace />} />
				</Routes>
			</Container>
		</Container>
	)
}

export default Home