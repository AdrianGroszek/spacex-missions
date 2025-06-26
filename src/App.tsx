import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MissionsPage from './pages/MissionsPage';
import DashboardPage from './pages/DashboardPage';
import MissionDetailsPage from './pages/MissionDetailsPage';

export default function App() {
	return (
		<div className='app-wrapper'>
			<Navbar />
			<div className='content-wrapper'>
				<Routes>
					<Route path='/' element={<Navigate to='/missions' replace />} />
					<Route path='/missions' element={<MissionsPage />} />
					<Route path='/missions/:id' element={<MissionDetailsPage />} />
					<Route path='/dashboard' element={<DashboardPage />} />
				</Routes>
			</div>
		</div>
	);
}
