import type { SimplifiedSpaceXLaunchpad } from '../../services/types';
import { capitalizeWord } from '../../utils/helpers';
import LaunchpadMap from '../LaunchpadMap/LaunchpadMap';
import styles from './LaunchpadDetailsCard.module.css';

type LaunchpadDetailsCardPropsType = {
	launchpadData: SimplifiedSpaceXLaunchpad;
};

export default function LaunchpadDetailsCard({
	launchpadData,
}: LaunchpadDetailsCardPropsType) {
	return (
		<div className={styles.sectionWrapper}>
			<div className={styles.detailsSectionHeader}>
				<span className={styles.detailsSectionTitle}>
					Launchpad: {launchpadData.full_name}
				</span>
				<span className={styles.detailsSectionStatus}>
					Status:{' '}
					{launchpadData.status === 'under construction' && (
						<span className={styles.textOrange}>
							{capitalizeWord(launchpadData.status)}
						</span>
					)}
					{launchpadData.status === 'active' && (
						<span className={styles.textGreen}>
							{capitalizeWord(launchpadData.status)}
						</span>
					)}
					{launchpadData.status === 'retired' && (
						<span className={styles.textRed}>
							{capitalizeWord(launchpadData.status)}
						</span>
					)}
				</span>
			</div>
			<div className={styles.detailsSectionBody}>
				<div className={styles.detailsSectionDescription}>
					<p className={styles.detailsSectionDescriptionTitle}>Description</p>
					<p className={styles.detailsSectionDescriptionText}>
						{launchpadData.details}
					</p>
				</div>
				<div className={styles.detailsSetcionRight}>
					<div className={styles.imgContainer}>
						<img
							src={
								launchpadData.image || '/assets/rocket-placeholder-image.jpg'
							}
							alt='launchpad image'
							className={styles.image}
						/>
					</div>
					<div className={styles.detailsSetcionRightInfoItems}>
						<p className={styles.InfoItem}>
							Locality:{' '}
							<span className={styles.textWhite}>{launchpadData.locality}</span>
						</p>
						<p className={styles.InfoItem}>
							Region:{' '}
							<span className={styles.textWhite}>{launchpadData.region}</span>
						</p>
						<p className={styles.InfoItem}>
							Launch attempts:{' '}
							<span className={styles.textWhite}>
								{launchpadData.launch_attempts}
							</span>
						</p>
						<p className={styles.InfoItem}>
							Launch success:{' '}
							<span className={styles.textWhite}>
								{launchpadData.launch_successes}
							</span>
						</p>
					</div>
				</div>
			</div>
			{/* MAP */}
			<LaunchpadMap
				lat={launchpadData.latitude}
				lng={launchpadData.longitude}
				launchpadImage={launchpadData.image}
			/>
			<div></div>
		</div>
	);
}
