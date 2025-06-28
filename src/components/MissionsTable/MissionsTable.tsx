import { useQuery } from '@tanstack/react-query';
import styles from './MissionsTable.module.css';
import { fetchLaunches } from '../../services/spacex';
import { useNavigate, useSearchParams } from 'react-router';

import { PiPlanetFill } from 'react-icons/pi';

export default function MissionsTable() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const {
		data: launches,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['launches'],
		queryFn: fetchLaunches,
	});

	const filterValue = searchParams.get('status') || 'all';

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error</div>;

	let filteredLaunches;

	if (filterValue === 'all') {
		filteredLaunches = launches;
	}

	if (filterValue === 'success') {
		filteredLaunches = launches?.filter((launch) => launch.success === true);
	}

	if (filterValue === 'failure') {
		filteredLaunches = launches?.filter((launch) => launch.success === false);
	}

	if (filterValue === 'pending') {
		filteredLaunches = launches?.filter((launch) => launch.upcoming === true);
	}

	return (
		<div className={styles.tableContainer}>
			<table className={styles.tableWrapper}>
				<thead>
					<tr>
						<th>Mission Name</th>
						<th>Start Date</th>
						<th>Status</th>
						<th>Ship</th>
						<th>Launchpad</th>
					</tr>
				</thead>

				<tbody>
					{filteredLaunches?.map((launch) => {
						return (
							<tr
								key={launch.id}
								onClick={() => navigate(`/missions/${launch.id}`)}>
								<td
									className={styles.missionNameContainer}
									data-cell='mission name'>
									<div className={styles.imgContainer}>
										{launch.image ? (
											<img
												src={launch.image}
												alt='patch image'
												className={styles.image}
											/>
										) : (
											<div className={styles.imagePlaceholder}>
												<PiPlanetFill />
											</div>
										)}
									</div>
									<div>
										<p>{launch.name}</p>
										<p className={styles.grayText}>
											Flight number: {launch.flight_number}
										</p>
									</div>
								</td>
								<td data-cell='start date'>
									{new Date(launch.date_utc).toLocaleDateString('pl-PL', {
										year: 'numeric',
										month: '2-digit',
										day: '2-digit',
									})}
								</td>
								<td
									className={
										launch.upcoming
											? styles.statusPending
											: launch.success
											? styles.statusSuccess
											: styles.statusFailure
									}
									data-cell='status'>
									{launch.upcoming
										? 'Pending'
										: launch.success
										? 'Success'
										: 'Failure'}
								</td>
								<td data-cell='ship'>
									<div>
										<p>Falcon 1</p>
										<p className={styles.grayText}>Rocket</p>
									</div>
								</td>
								<td data-cell='launchpad'>
									<div>
										<p>VAFB SLC 3W</p>
										<p className={styles.grayText}>California</p>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
