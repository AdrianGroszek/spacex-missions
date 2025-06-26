import styles from './SearchBar.module.css';

export default function SearchBar() {
	return (
		<div className={styles.inputWrapper}>
			<input className={styles.input} placeholder='Search...' />
		</div>
	);
}
