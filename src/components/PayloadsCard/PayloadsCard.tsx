import styles from './PayloadsCard.module.css';

export default function PayloadsCard() {
	return (
		<div className={styles.sectionWrapper}>
			<p className={styles.textGray}>Payloads</p>
			<div className={styles.payloads}>
				<div className={styles.payloadsItem}>
					<span className={styles.payloadsItemTitle}>FalconSAT-2</span>
					<span>
						Type: <span className={styles.textWhite}>Satellite</span>
					</span>
					<span>
						Customer: <span className={styles.textWhite}>DARPA</span>
					</span>
					<span>
						Mass: <span className={styles.textWhite}>20 kg</span>
					</span>
					<span>
						Orbit: <span className={styles.textWhite}>LEO</span>
					</span>
				</div>
				<div className={styles.payloadsItem}>
					<span className={styles.payloadsItemTitle}>FalconSAT-2</span>
					<span>
						Type: <span className={styles.textWhite}>Satellite</span>
					</span>
					<span>
						Customer: <span className={styles.textWhite}>DARPA</span>
					</span>
					<span>
						Mass: <span className={styles.textWhite}>20 kg</span>
					</span>
					<span>
						Orbit: <span className={styles.textWhite}>LEO</span>
					</span>
				</div>
			</div>
			<div className={styles.crew}>
				<p className={styles.textGray}>Crew</p>
				<div className={styles.crewContainer}>
					<div className={styles.crewCard}>
						<div className={styles.imageContainer}>
							<img
								src='https://imgur.com/0smMgMH.png'
								alt='crew image'
								className={styles.image}
							/>
						</div>
						<span className={styles.crewName}>Douglas Hurley</span>
						<span className={`${styles.textGray} ${styles.textSmall}`}>
							NASA
						</span>
						<span className={`${styles.textGray} ${styles.textSmall}`}>
							Status: <span className={styles.textGreen}>Active</span>
						</span>
					</div>
					<div className={styles.crewCard}>
						<div className={styles.imageContainer}>
							<img
								src='https://imgur.com/0smMgMH.png'
								alt='crew image'
								className={styles.image}
							/>
						</div>
						<span className={styles.crewName}>Douglas Hurley</span>
						<span className={`${styles.textGray} ${styles.textSmall}`}>
							NASA
						</span>
						<span className={`${styles.textGray} ${styles.textSmall}`}>
							Status: <span className={styles.textGreen}>Active</span>
						</span>
					</div>
					<div className={styles.crewCard}>
						<div className={styles.imageContainer}>
							<img
								src='https://imgur.com/0smMgMH.png'
								alt='crew image'
								className={styles.image}
							/>
						</div>
						<span className={styles.crewName}>Douglas Hurley</span>
						<span className={`${styles.textGray} ${styles.textSmall}`}>
							NASA
						</span>
						<span className={`${styles.textGray} ${styles.textSmall}`}>
							Status: <span className={styles.textGreen}>Active</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
