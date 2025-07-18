import styles from './DashboardPage.module.css';

export default function DashboardPage() {
	return (
		<div className={styles.dashboardWrapper}>
			<h2 className={styles.textHeding}>This page is under construction</h2>
			<p className={styles.textSmall}>
				We're working on it and will have it ready soon. Stay tuned!
			</p>
			<div className={styles.imageContainer}>
				<div className={styles.gradientImg}></div>

				<img src='/assets/under-construction.jpg' alt='' />
			</div>
		</div>
	);
}
