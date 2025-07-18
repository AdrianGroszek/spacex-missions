import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './CrewCard.module.css';
import { fetchCrew } from '../../services/spacex';
import type { SimplifiedSpaceXCrew } from '../../services/types';
import { capitalizeWord } from '../../utils/helpers';

type CrewCardPropsType = {
	crewIds: string[];
};

export default function CrewCard({ crewIds }: CrewCardPropsType) {
	const queryClient = useQueryClient();

	const cachedCrew: SimplifiedSpaceXCrew[] | undefined =
		queryClient.getQueryData(['crew']);

	const { data: fallbackCrew, isLoading } = useQuery({
		queryKey: ['crew'],
		queryFn: fetchCrew,
		enabled: !cachedCrew, // if no cached data
	});

	if (isLoading) return <div>Loading...</div>;

	const crew = cachedCrew || fallbackCrew;

	const filteredCrew = crew?.filter((crew) => crewIds.includes(crew.id));

	// console.log(filteredCrew);

	return (
		<div className={styles.crew}>
			<p className={styles.textGray}>Crew</p>
			{!filteredCrew ||
				(filteredCrew.length === 0 && (
					<div className={styles.noCrewInfo}>
						<p>There were no crew members on this flight.</p>
					</div>
				))}
			<div className={styles.crewContainer}>
				{filteredCrew?.map((crew) => (
					<a
						href={crew.wikipedia}
						target='blank'
						className={styles.crewCard}
						key={crew.id}>
						<div className={styles.imageContainer}>
							<img src={crew.image} alt='crew image' className={styles.image} />
						</div>
						<div className={styles.crewInfoWrapper}>
							<p className={styles.crewName}>{crew.name}</p>

							<p className={`${styles.textGray} ${styles.textSmall}`}>
								{crew.agency}
							</p>
							<p className={`${styles.textGray} ${styles.textSmall}`}>
								Status:{' '}
								<span className={styles.textGreen}>
									{capitalizeWord(crew.status)}
								</span>
							</p>
						</div>
					</a>
				))}
			</div>
		</div>
	);
}
