import styles from './CrewCard.module.css';

export default function CrewCard() {
	return (
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
					<span className={`${styles.textGray} ${styles.textSmall}`}>NASA</span>
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
					<span className={`${styles.textGray} ${styles.textSmall}`}>NASA</span>
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
					<span className={`${styles.textGray} ${styles.textSmall}`}>NASA</span>
					<span className={`${styles.textGray} ${styles.textSmall}`}>
						Status: <span className={styles.textGreen}>Active</span>
					</span>
				</div>
			</div>
		</div>
	);
}
