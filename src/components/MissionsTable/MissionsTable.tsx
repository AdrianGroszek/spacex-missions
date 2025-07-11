import styles from './MissionsTable.module.css';
import { useNavigate } from 'react-router';

import { PiPlanetFill } from 'react-icons/pi';
import {
	useSpaceXMissions,
	type FilterStateType,
} from '../../hooks/useSpaceXMissions';

type MissionsTablePropsType = {
	filters: FilterStateType;
};

export default function MissionsTable({ filters }: MissionsTablePropsType) {
	const navigate = useNavigate();

	const {
		missions: filteredLaunches,
		isLoading,
		error,
	} = useSpaceXMissions(filters);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error</div>;

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
								key={launch.launchData.id}
								onClick={() => navigate(`/missions/${launch.launchData.id}`)}>
								<td
									className={styles.missionNameContainer}
									data-cell='mission name'>
									<div className={styles.imgContainer}>
										{launch.launchData.image ? (
											<img
												src={launch.launchData.image}
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
										<p>{launch.launchData.name}</p>
										<p className={styles.grayText}>
											Flight number: {launch.launchData.flight_number}
										</p>
									</div>
								</td>
								<td data-cell='start date'>
									{new Date(launch.launchData.date_utc).toLocaleDateString(
										'pl-PL',
										{
											year: 'numeric',
											month: '2-digit',
											day: '2-digit',
										}
									)}
								</td>
								<td
									className={
										launch.launchData.upcoming
											? styles.statusPending
											: launch.launchData.success
											? styles.statusSuccess
											: styles.statusFailure
									}
									data-cell='status'>
									{launch.launchData.upcoming
										? 'Pending'
										: launch.launchData.success
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
