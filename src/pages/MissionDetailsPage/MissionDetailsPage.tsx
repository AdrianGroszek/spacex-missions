import { useNavigate, useParams } from 'react-router';
import { format } from 'date-fns';
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
import PayloadsSection from '../../components/PayloadsSection/PayloadsSection';
import { FaArrowLeft } from 'react-icons/fa';

export default function MissionDetailsPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	function handlePrevPage() {
		navigate(-1);
	}

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

	return (
		<>
			{/* Section title */}
			<div className={styles.missionTitleContainer}>
				<div className={styles.prevPageButtonWrapper}>
					<button className={styles.prevPageButton} onClick={handlePrevPage}>
						<FaArrowLeft />
					</button>
				</div>

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
			<div className={styles.detailsSectionDescription}>
				<p className={styles.detailsSectionDescriptionTitle}>Mission Details</p>
				{launch?.details && (
					<p className={styles.detailsSectionDescriptionText}>
						{launch?.details}
					</p>
				)}
			</div>
			{/* Rocket details */}
			{rocket && launch && (
				<RocketDetailsCard
					rocketData={rocket}
					landing_attempt={launch.landing_attempt}
					landing_success={launch.landing_success}
				/>
			)}

			{/* Launchpad details */}
			{launchpad && <LaunchpadDetailsCard launchpadData={launchpad} />}

			{/* Payloads section */}
			{launch && <PayloadsSection launch={launch} />}
		</>
	);
}
