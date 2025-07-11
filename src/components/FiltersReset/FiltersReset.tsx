import styles from './FiltersReset.module.css';

import { FaXmark } from 'react-icons/fa6';

type FiltersResetPropsType = {
	onReset: () => void;
};

export default function FiltersReset({ onReset }: FiltersResetPropsType) {
	return (
		<div className={styles.buttonWrapper}>
			<button className={styles.filterResetButton} onClick={onReset}>
				<FaXmark />
			</button>
		</div>
	);
}
