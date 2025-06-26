import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MissionsPage from './pages/MissionsPage/MissionsPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import MissionDetailsPage from './pages/MissionDetailsPage/MissionDetailsPage';

export default function App() {
	return (
		<div className='app-wrapper'>
			<Navbar />
			<main className='content-wrapper'>
				<Routes>
					<Route path='/' element={<Navigate to='/missions' replace />} />
					<Route path='/missions' element={<MissionsPage />} />
					<Route path='/missions/:id' element={<MissionDetailsPage />} />
					<Route path='/dashboard' element={<DashboardPage />} />
				</Routes>
			</main>
		</div>
	);
}
