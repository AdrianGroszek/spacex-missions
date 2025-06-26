import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';

export default function App() {
	return (
		<div>
			<Navbar />
			<div>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</div>
		</div>
	);
}
