import styles from './FiltersDropdown.module.css';

import { FaSortAmountDown } from 'react-icons/fa';

export default function FiltersDropdown() {
	return (
		<div className={styles.buttonWrapper}>
			<button className={styles.filterDropdownButton}>
				<FaSortAmountDown />
			</button>
		</div>
	);
}
