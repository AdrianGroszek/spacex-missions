import styles from './MissionsTable.module.css';

export default function MissionsTable() {
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
					<tr>
						<td
							className={styles.missionNameContainer}
							data-cell='mission name'>
							<div className={styles.imgContainer}></div>
							<div>
								<p>Crew-5</p>
								<p className={styles.grayText}>Flight number: 187</p>
							</div>
						</td>
						<td data-cell='start date'>10.05.2022</td>
						<td className={styles.statusSuccess} data-cell='status'>
							Success
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
				</tbody>
			</table>
		</div>
	);
}
