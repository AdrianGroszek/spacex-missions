import { Link, NavLink } from 'react-router';

import { IoRocketSharp } from 'react-icons/io5';
import { IoPieChart } from 'react-icons/io5';

import styles from './Navbar.module.css';

export default function Navbar() {
	return (
		<div className={styles.navbarContainer}>
			<nav className={styles.navbar}>
				<Link to='/missions' className={styles.navbarLogo}>
					SpaceX <span>Missions</span>
				</Link>

				{/* Desktop Navigation */}
				<ul className={styles.navbarListDesktop}>
					<li>
						<NavLink
							to='/missions'
							className={({ isActive }) => (isActive ? styles.activeLink : '')}>
							Missions
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/dashboard'
							className={({ isActive }) => (isActive ? styles.activeLink : '')}>
							Dashboard
						</NavLink>
					</li>
				</ul>

				{/* Mobile Navigation */}
				<ul className={styles.navbarListMobile}>
					<li>
						<NavLink
							to='/missions'
							className={({ isActive }) => (isActive ? styles.activeLink : '')}>
							<IoRocketSharp />
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/dashboard'
							className={({ isActive }) => (isActive ? styles.activeLink : '')}>
							<IoPieChart />
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
}
