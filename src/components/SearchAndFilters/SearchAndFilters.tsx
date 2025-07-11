import type { Dispatch } from 'react';
import type { FilterStateType } from '../../hooks/useSpaceXMissions';
import FiltersDropdown from '../FiltersDropdown/FiltersDropdown';
import FiltersReset from '../FiltersReset/FiltersReset';
import FiltersToggle from '../FitersToggle/FiltersToggle';
import SearchBar from '../SearchBar/SearchBar';
import styles from './SearchAndFilters.module.css';

type SearchAndFiltersPropsType = {
	filters: FilterStateType;
	onSearchChange: Dispatch<React.SetStateAction<string>>;
	onReset: () => void;
};

export default function SearchAndFilters({
	filters,
	onSearchChange,
	onReset,
}: SearchAndFiltersPropsType) {
	return (
		<div className={styles.filtersContainer}>
			<SearchBar onSearchChange={onSearchChange} search={filters.search} />

			<div className={styles.rightFiltersGroup}>
				<FiltersToggle />
				<FiltersDropdown />
				<FiltersReset onReset={onReset} />
			</div>
		</div>
	);
}
