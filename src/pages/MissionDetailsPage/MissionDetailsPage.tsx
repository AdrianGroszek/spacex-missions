import { useParams } from 'react-router';
import { format } from 'date-fns';
import PayloadsCard from '../../components/PayloadsCard/PayloadsCard';
import styles from './MissionDetailsPage.module.css';
import { useQuery } from '@tanstack/react-query';
import {
	fetchLaunch,
	fetchLaunchpad,
	fetchRocket,
} from '../../services/spacex';
import { PiPlanetFill } from 'react-icons/pi';
import RocketDetailsCard from '../../components/RocketDetailsCard/RocketDetailsCard';
import LaunchpadDetailsCard from '../../components/LaunchpadDetailsCard/LaunchpadDetailsCard';

export default function MissionDetailsPage() {
	const { id } = useParams<{ id: string }>();

	// fetch launch/id
	const {
		data: launch,
		isLoading: isLoadingLaunch,
		error: errorLaunch,
	} = useQuery({
		queryKey: ['launch', id],
		queryFn: () => fetchLaunch(id!),
		enabled: typeof id === 'string',
	});

	// fetch rocket/id
	const rocketId = launch?.rocket;
	const { data: rocket, isLoading: isLoadingRocket } = useQuery({
		queryKey: ['rocket', rocketId],
		queryFn: () => fetchRocket(rocketId!),
		enabled: !!rocketId,
	});

	// fetch launchpad/id
	const launchpadId = launch?.launchpad;
	const { data: launchpad, isLoading: isLoadingLaunchpad } = useQuery({
		queryKey: ['launchpad', launchpadId],
		queryFn: () => fetchLaunchpad(launchpadId!),
		enabled: !!launchpadId,
	});

	if (isLoadingLaunch || isLoadingRocket || isLoadingLaunchpad)
		return <div>Loading...</div>;
	if (errorLaunch) return <div>Error</div>;

	const launchDate = !launch?.date_utc
		? 'No date'
		: format(new Date(launch?.date_utc), 'dd MMMM yyyy');

	// Combine data into one object
	const missionDetails = {
		launch,
		rocket,
		launchpad,
	};

	console.log(missionDetails);
	return (
		<>
			{/* Section title */}
			<div className={styles.missionTitleContainer}>
				<div className={styles.imgContainer}>
					{launch?.image ? (
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
				<div className={styles.titleWrapper}>
					<h1>Mission: {launch?.name}</h1>
					<div className={styles.missionTitleInfoSmall}>
						<span>Flight number: {launch?.flight_number}</span>
						<span>{launchDate}</span>
						{launch?.success && (
							<span className={styles.statusSuccess}>✔ Success</span>
						)}
						{!launch?.success && launch?.upcoming && (
							<span className={styles.statusPending}>🕓 Pending</span>
						)}
						{!launch?.success && !launch?.upcoming && (
							<span className={styles.statusFailure}>❌ Failure</span>
						)}
					</div>
				</div>
			</div>

			{/* Details card */}
			{/* Rocket details */}
			{missionDetails.rocket && launch && (
				<RocketDetailsCard
					rocketData={missionDetails.rocket}
					landing_attempt={launch.landing_attempt}
					landing_success={launch.landing_success}
				/>
			)}

			{/* Launchpad details */}
			{missionDetails.launchpad && (
				<LaunchpadDetailsCard launchpadData={missionDetails.launchpad} />
			)}

			{/* Payloads card */}
			<PayloadsCard />
		</>
	);
}
