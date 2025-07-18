import MissionLinksList from '../MissionLinksList/MissionLinksList';
import styles from './Footer.module.css';

export default function Footer() {
	return (
		<div className={styles.footerWrapper}>
			<MissionLinksList />
			<p className={styles.createdBy}>
				Created by{' '}
				<a
					href='https://www.linkedin.com/in/adrian-grochowski-x17/'
					target='blank'>
					Adrian
				</a>{' '}
				© 2025
			</p>
		</div>
	);
}
