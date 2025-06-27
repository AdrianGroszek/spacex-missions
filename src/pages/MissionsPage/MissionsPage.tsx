import MissionsTable from '../../components/MissionsTable/MissionsTable';
import SearchAndFilters from '../../components/SearchAndFilters/SearchAndFilters';
import styles from './MissionsPage.module.css';

export default function MissionsPage() {
	return (
		<>
			{/* Page heading */}
			<div className={styles.headingWrapper}>
				<h1 className={styles.sectionHeading}>Missions List</h1>
				<p className={styles.grayText}>148 Results</p>
			</div>

			{/* Search, Sort and Filter component */}
			<SearchAndFilters />

			{/* Table with missions list */}
			<MissionsTable />
		</>
	);
}
