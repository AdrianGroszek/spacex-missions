import styles from './FiltersReset.module.css';

import { FaXmark } from 'react-icons/fa6';

export default function FiltersReset() {
	return (
		<div className={styles.buttonWrapper}>
			<button className={styles.filterResetButton}>
				<FaXmark />
			</button>
		</div>
	);
}
