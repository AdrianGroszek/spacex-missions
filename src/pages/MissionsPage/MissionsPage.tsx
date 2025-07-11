import MissionsTable from '../../components/MissionsTable/MissionsTable';
import SearchAndFilters from '../../components/SearchAndFilters/SearchAndFilters';

import styles from './MissionsPage.module.css';
import {
	useSpaceXMissions,
	type FilterStateType,
	type SortType,
	type StatusFilterType,
} from '../../hooks/useSpaceXMissions';
import { useSearchParams } from 'react-router';
import { useState } from 'react';

export default function MissionsPage() {
	const [search, setSearch] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();

	const filters: FilterStateType = {
		status: (searchParams.get('status') || 'all') as StatusFilterType,
		sort: (searchParams.get('sort') || 'date-desc') as SortType,
		search,
	};

	function resetFilters() {
		setSearch('');
		setSearchParams({});
	}

	const { missions } = useSpaceXMissions(filters);

	return (
		<>
			{/* Page heading */}
			<div className={styles.headingWrapper}>
				<h1 className={styles.sectionHeading}>Missions List</h1>
				<p className={styles.grayText}>{missions.length} Results</p>
			</div>

			{/* Search, Sort and Filter component */}
			<SearchAndFilters
				filters={filters}
				onSearchChange={setSearch}
				onReset={resetFilters}
			/>

			{/* Table with missions list */}
			<MissionsTable filters={filters} />
		</>
	);
}
