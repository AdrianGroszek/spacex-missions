import { FaReddit, FaWikipediaW, FaYoutube } from 'react-icons/fa';
import styles from './MissionLinksList.module.css';

import { PiArticleNyTimes } from 'react-icons/pi';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import type { SimplifiedSpaceXLaunch } from '../../services/types';

export default function MissionLinksList() {
	const { id } = useParams();
	const queryClient = useQueryClient();

	const mission = queryClient.getQueryData<SimplifiedSpaceXLaunch>([
		'launch',
		id,
	]);

	if (!mission) return <p>ss</p>;

	if (
		!mission.links.reddit.campaign &&
		!mission.links.reddit.launch &&
		!mission.links.reddit.media &&
		!mission.links.reddit.recovery &&
		!mission.links.article &&
		!mission.links.wikipedia &&
		!mission.links.webcast
	) {
		return (
			<p className={styles.noLinksFound}>
				No links available for this mission.
			</p>
		);
	}

	console.log(mission.links);

	return (
		<div className={styles.linksList}>
			{(mission.links.reddit.campaign ||
				mission.links.reddit.launch ||
				mission.links.reddit.media ||
				mission.links.reddit.recovery) && (
				<ul className={styles.linksListUl}>
					<p className={styles.linksTitle}>Mission Discussion</p>
					{mission.links.reddit.campaign && (
						<li className={styles.linkItem}>
							<a
								href={mission.links.reddit.campaign}
								target='_blank'
								className={styles.linkItemLink}>
								<div className={styles.linkItemLinkIcon}>
									<FaReddit />
								</div>
								<p className={styles.linkItemLinkText}>Reddit - Campaign</p>
							</a>
						</li>
					)}
					{mission.links.reddit.launch && (
						<li className={styles.linkItem}>
							<a
								href={mission.links.reddit.launch}
								target='_blank'
								className={styles.linkItemLink}>
								<div className={styles.linkItemLinkIcon}>
									<FaReddit />
								</div>
								<p className={styles.linkItemLinkText}>Reddit - Launch</p>
							</a>
						</li>
					)}
					{mission.links.reddit.media && (
						<li className={styles.linkItem}>
							<a
								href={mission.links.reddit.media}
								target='_blank'
								className={styles.linkItemLink}>
								<div className={styles.linkItemLinkIcon}>
									<FaReddit />
								</div>
								<p className={styles.linkItemLinkText}>Reddit - Media</p>
							</a>
						</li>
					)}
					{mission.links.reddit.recovery && (
						<li className={styles.linkItem}>
							<a
								href={mission.links.reddit.recovery}
								target='_blank'
								className={styles.linkItemLink}>
								<div className={styles.linkItemLinkIcon}>
									<FaReddit />
								</div>
								<p className={styles.linkItemLinkText}>Reddit - Recovery</p>
							</a>
						</li>
					)}
				</ul>
			)}

			{(mission.links.article || mission.links.wikipedia) && (
				<ul className={styles.linksListUl}>
					<p className={styles.linksTitle}>Read More</p>
					{mission.links.article && (
						<li className={styles.linkItem}>
							<a
								href={mission.links.article}
								target='_blank'
								className={styles.linkItemLink}>
								<div className={styles.linkItemLinkIcon}>
									<PiArticleNyTimes />
								</div>
								<p className={styles.linkItemLinkText}>Read Full Article</p>
							</a>
						</li>
					)}
					{mission.links.wikipedia && (
						<li className={styles.linkItem}>
							<a
								href={mission.links.wikipedia}
								target='_blank'
								className={styles.linkItemLink}>
								<div className={styles.linkItemLinkIcon}>
									<FaWikipediaW />
								</div>
								<p className={styles.linkItemLinkText}>Wikipedia</p>
							</a>
						</li>
					)}
				</ul>
			)}
			{mission.links.webcast && (
				<ul className={styles.linksListUl}>
					<p className={styles.linksTitle}>Launch Video</p>
					{mission.links.webcast && (
						<li className={styles.linkItem}>
							<a
								href={mission.links.webcast}
								target='_blank'
								className={styles.linkItemLink}>
								<div className={styles.linkItemLinkIcon}>
									<FaYoutube />
								</div>
								<p className={styles.linkItemLinkText}>Watch Webcast</p>
							</a>
						</li>
					)}
				</ul>
			)}
		</div>
	);
}
