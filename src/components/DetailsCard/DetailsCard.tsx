import styles from './DetailsCard.module.css';

export default function DetailsCard() {
	return (
		<div className={styles.sectionWrapper}>
			<div className={styles.detailsSectionHeader}>
				<span className={styles.detailsSectionTitle}>Rocket: Falcon 9</span>
				<span className={styles.detailsSectionStatus}>
					Status: <span className={styles.statusSuccess}>Active</span>
				</span>
			</div>
			<div className={styles.detailsSectionBody}>
				<div className={styles.detailsSectionDescription}>
					<p className={styles.detailsSectionDescriptionTitle}>Description</p>
					<p className={styles.detailsSectionDescriptionText}>
						The Falcon 1 was an expendable launch system privately developed and
						manufactured by SpaceX during 2006-2009. On 28 September 2008,
						Falcon 1 became the first privately-developed liquid-fuel launch
						vehicle to go into orbit around the Earth.
					</p>
				</div>
				<div className={styles.detailsSetcionRight}>
					<div className={styles.imgContainer}>
						<img
							src='https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg'
							alt='rocket image'
							className={styles.image}
						/>
					</div>
					<div className={styles.detailsSetcionRightInfoItems}>
						<p className={styles.InfoItem}>
							Height <span className={styles.textWhite}>22.25 m</span>
						</p>
						<p className={styles.InfoItem}>
							Mass <span className={styles.textWhite}>30 146 kg</span>
						</p>
						<p className={styles.InfoItem}>
							First Flight <span className={styles.textWhite}>24.03.2006</span>
						</p>
						<p className={styles.InfoItem}>
							Launch Cost <span className={styles.textWhite}>$6 700 000</span>
						</p>
						<p className={styles.InfoItem}>
							Success Rate <span className={styles.textWhite}>40%</span>
						</p>
						<div className={styles.progressBar}>
							<div className={styles.progressBarPercent}></div>
						</div>
						<p className={styles.InfoItem}>
							Landing Attempt{' '}
							<span className={`${styles.textWhite} ${styles.textGreen}`}>
								Yes
							</span>
						</p>
						<p className={styles.InfoItem}>
							Landing{' '}
							<span className={`${styles.textWhite} ${styles.textGreen}`}>
								Success
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
