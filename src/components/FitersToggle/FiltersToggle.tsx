import styles from './FiltersToggle.module.css';

import { FiLoader } from 'react-icons/fi';
import { FaListUl } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { TbAlertTriangle } from 'react-icons/tb';
import { useSearchParams } from 'react-router';

export default function FiltersToggle() {
	const [searchParams, setSearchParams] = useSearchParams();

	function handleClick(value: string) {
		searchParams.set('status', value);
		setSearchParams(searchParams);
	}

	const filterValue = searchParams.get('status') || 'all';

	return (
		<>
			{/* Desktop Toggle Filter */}
			<div className={styles.fitersToggleWrapperDesktop}>
				<button
					onClick={() => handleClick('all')}
					className={`${styles.toggleButton} ${
						filterValue === 'all' && styles.active
					}`}>
					All
				</button>
				<button
					onClick={() => handleClick('success')}
					className={`${styles.toggleButton} ${
						filterValue === 'success' && styles.active
					}`}>
					Success
				</button>
				<button
					onClick={() => handleClick('failure')}
					className={`${styles.toggleButton} ${
						filterValue === 'failure' && styles.active
					}`}>
					Failure
				</button>
				<button
					onClick={() => handleClick('pending')}
					className={`${styles.toggleButton} ${
						filterValue === 'pending' && styles.active
					}`}>
					Pending
				</button>
			</div>

			{/* Mobile Toggle Filter */}
			<div className={styles.fitersToggleWrapperMobile}>
				<button
					onClick={() => handleClick('all')}
					className={`${styles.toggleButton} ${
						filterValue === 'all' && styles.active
					}`}>
					<FaListUl />
				</button>
				<button
					onClick={() => handleClick('success')}
					className={`${styles.toggleButton} ${
						filterValue === 'success' && styles.active
					}`}>
					<FaCheck />
				</button>
				<button
					onClick={() => handleClick('failure')}
					className={`${styles.toggleButton} ${
						filterValue === 'failure' && styles.active
					}`}>
					<TbAlertTriangle />
				</button>
				<button
					onClick={() => handleClick('pending')}
					className={`${styles.toggleButton} ${
						filterValue === 'pending' && styles.active
					}`}>
					<FiLoader />
				</button>
			</div>
		</>
	);
}
