import styles from './FiltersToggle.module.css';

import { FiLoader } from 'react-icons/fi';
import { FaListUl } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { TbAlertTriangle } from 'react-icons/tb';

export default function FiltersToggle() {
	return (
		<>
			{/* Desktop Toggle Filter */}
			<div className={styles.fitersToggleWrapperDesktop}>
				<button className={`${styles.toggleButton} ${styles.active}`}>
					All
				</button>
				<button className={styles.toggleButton}>Success</button>
				<button className={styles.toggleButton}>Failure</button>
				<button className={styles.toggleButton}>Pending</button>
			</div>

			{/* Mobile Toggle Filter */}
			<div className={styles.fitersToggleWrapperMobile}>
				<button className={`${styles.toggleButton} ${styles.active}`}>
					<FaListUl />
				</button>
				<button className={styles.toggleButton}>
					<FaCheck />
				</button>
				<button className={styles.toggleButton}>
					<TbAlertTriangle />
				</button>
				<button className={styles.toggleButton}>
					<FiLoader />
				</button>
			</div>
		</>
	);
}
