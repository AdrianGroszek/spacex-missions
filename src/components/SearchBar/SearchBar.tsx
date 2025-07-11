import type { Dispatch } from 'react';
import styles from './SearchBar.module.css';

type SearchBarPropsType = {
	onSearchChange: Dispatch<React.SetStateAction<string>>;
	search: string;
};

export default function SearchBar({
	onSearchChange,
	search,
}: SearchBarPropsType) {
	return (
		<div className={styles.inputWrapper}>
			<input
				className={styles.input}
				placeholder='Search...'
				value={search}
				onChange={(e) => onSearchChange(e.target.value)}
			/>
		</div>
	);
}
