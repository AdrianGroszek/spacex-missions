import MissionsTable from '../../components/MissionsTable/MissionsTable';
import SearchAndFilters from '../../components/SearchAndFilters/SearchAndFilters';

import styles from './MissionsPage.module.css';
import { fetchLaunches } from '../../services/spacex';
import { useQuery } from '@tanstack/react-query';

export default function MissionsPage() {
	const { data: launches } = useQuery({
		queryKey: ['launches'],
		queryFn: fetchLaunches,
	});

	return (
		<>
			{/* Page heading */}
			<div className={styles.headingWrapper}>
				<h1 className={styles.sectionHeading}>Missions List</h1>
				<p className={styles.grayText}>{launches?.length} Results</p>
			</div>

			{/* Search, Sort and Filter component */}
			<SearchAndFilters />

			{/* Table with missions list */}
			<MissionsTable />
		</>
	);
}
