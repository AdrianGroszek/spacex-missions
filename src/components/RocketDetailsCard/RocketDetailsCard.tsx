import type { SimplifiedSpaceXRocket } from '../../services/types';
import { capitalizeWord } from '../../utils/helpers';
import styles from './RocketDetailsCard.module.css';

type RocketDetailsCardPropsType = {
	rocketData: SimplifiedSpaceXRocket;
	landing_attempt: boolean;
	landing_success: boolean | null;
};

export default function RocketDetailsCard({
	rocketData,
	landing_attempt,
	landing_success,
}: RocketDetailsCardPropsType) {
	return (
		<div className={styles.sectionWrapper}>
			<div className={styles.detailsSectionHeader}>
				<span className={styles.detailsSectionTitle}>
					{capitalizeWord(rocketData.type)}: {rocketData.name}
				</span>
				<span className={styles.detailsSectionStatus}>
					Status:{' '}
					<span
						className={rocketData.active ? styles.textGreen : styles.textRed}>
						{rocketData.active ? 'Active' : 'Inactive'}
					</span>
				</span>
			</div>
			<div className={styles.detailsSectionBody}>
				<div className={styles.detailsSectionDescription}>
					<p className={styles.detailsSectionDescriptionTitle}>Description</p>
					<p className={styles.detailsSectionDescriptionText}>
						{rocketData.description}
					</p>
				</div>
				<div className={styles.detailsSetcionRight}>
					<div className={styles.imgContainer}>
						<img
							src={
								rocketData.flickr_image ||
								'/assets/rocket-placeholder-image.jpg'
							}
							alt='rocket image'
							className={styles.image}
						/>
					</div>
					<div className={styles.detailsSetcionRightInfoItems}>
						<p className={styles.InfoItem}>
							Height:{' '}
							<span className={styles.textWhite}>
								{rocketData.height_meters} m
							</span>
						</p>
						<p className={styles.InfoItem}>
							Mass:{' '}
							<span className={styles.textWhite}>
								{rocketData.mass_kg.toLocaleString()} kg
							</span>
						</p>
						<p className={styles.InfoItem}>
							First Flight:{' '}
							<span className={styles.textWhite}>
								{rocketData.first_flight}
							</span>
						</p>
						<p className={styles.InfoItem}>
							Launch Cost:{' '}
							<span className={styles.textWhite}>
								${rocketData.cost_per_launch.toLocaleString()}
							</span>
						</p>
						<p className={styles.InfoItem}>
							Success Rate:{' '}
							<span className={styles.textWhite}>
								{rocketData.success_rate_pct}%
							</span>
						</p>
						<div className={styles.progressBar}>
							<div
								style={{ width: `${rocketData.success_rate_pct}%` }}
								className={styles.progressBarPercent}></div>
						</div>
						<p className={styles.InfoItem}>
							Landing Attempt:{' '}
							<span
								className={
									landing_attempt ? `${styles.textGreen}` : `${styles.textRed}`
								}>
								{landing_attempt ? 'Yes' : 'No'}
							</span>
						</p>
						{landing_attempt && (
							<p className={styles.InfoItem}>
								Landing:{' '}
								<span
									className={
										landing_success
											? `${styles.textGreen}`
											: `${styles.textRed}`
									}>
									{landing_success ? '✔ Success' : '❌ Failure'}
								</span>
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
