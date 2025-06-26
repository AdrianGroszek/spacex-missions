import FiltersDropdown from '../FiltersDropdown/FiltersDropdown';
import FiltersReset from '../FiltersReset/FiltersReset';
import FiltersToggle from '../FitersToggle/FiltersToggle';
import SearchBar from '../SearchBar/SearchBar';
import styles from './SearchAndFilters.module.css';

export default function SearchAndFilters() {
	return (
		<div className={styles.filtersContainer}>
			<SearchBar />

			<div className={styles.rightFiltersGroup}>
				<FiltersToggle />
				<FiltersDropdown />
				<FiltersReset />
			</div>
		</div>
	);
}
