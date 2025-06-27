import DetailsCard from '../../components/DetailsCard/DetailsCard';
import PayloadsCard from '../../components/PayloadsCard/PayloadsCard';
import styles from './MissionDetailsPage.module.css';

export default function MissionDetailsPage() {
	return (
		<>
			{/* Section title */}
			<div className={styles.missionTitleContainer}>
				<div className={styles.imgContainer}>
					<img
						src='https://images2.imgbox.com/eb/0f/Vev7xkUX_o.png'
						alt='patch image'
						className={styles.image}
					/>
				</div>
				<div className={styles.titleWrapper}>
					<h1>Mission: Crew-5</h1>
					<div className={styles.missionTitleInfoSmall}>
						<span>Flight number: 187</span>
						<span>10.05.2022</span>
						<span className={styles.statusSuccess}>Success</span>
					</div>
				</div>
			</div>

			{/* Details card */}
			<DetailsCard />
			<DetailsCard />

			{/* Payloads card */}
			<PayloadsCard />
		</>
	);
}
