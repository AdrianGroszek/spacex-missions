import type { SimplifiedSpaceXLaunch } from '../../services/types';
import CrewCard from '../CrewCard/CrewCard';
import PayloadCard from '../PayloadCard/PayloadCard';
import styles from './PayloadsSection.module.css';

type PayloadsSectionPropsType = {
	launch: SimplifiedSpaceXLaunch;
};

export default function PayloadsSection({ launch }: PayloadsSectionPropsType) {
	return (
		<div className={styles.sectionWrapper}>
			<PayloadCard payloadsIds={launch.payloads} />
			<CrewCard crewIds={launch.crew} />
		</div>
	);
}
