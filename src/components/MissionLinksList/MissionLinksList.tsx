import { FaReddit, FaWikipediaW, FaYoutube } from 'react-icons/fa';
import styles from './MissionLinksList.module.css';

import { PiArticleNyTimes } from 'react-icons/pi';

export default function MissionLinksList() {
	return (
		<div className={styles.linksList}>
			<ul className={styles.linksListUl}>
				<p className={styles.linksTitle}>Mission Discussion</p>
				<li className={styles.linkItem}>
					<a href='' className={styles.linkItemLink}>
						<div className={styles.linkItemLinkIcon}>
							<FaReddit />
						</div>
						<p className={styles.linkItemLinkText}>Reddit - Campaign</p>
					</a>
				</li>
				<li className={styles.linkItem}>
					<a href='' className={styles.linkItemLink}>
						<div className={styles.linkItemLinkIcon}>
							<FaReddit />
						</div>
						<p className={styles.linkItemLinkText}>Reddit - Launch</p>
					</a>
				</li>
				<li className={styles.linkItem}>
					<a href='' className={styles.linkItemLink}>
						<div className={styles.linkItemLinkIcon}>
							<FaReddit />
						</div>
						<p className={styles.linkItemLinkText}>Reddit - Media</p>
					</a>
				</li>
				<li className={styles.linkItem}>
					<a href='' className={styles.linkItemLink}>
						<div className={styles.linkItemLinkIcon}>
							<FaReddit />
						</div>
						<p className={styles.linkItemLinkText}>Reddit - Recovery</p>
					</a>
				</li>
			</ul>

			<ul className={styles.linksListUl}>
				<p className={styles.linksTitle}>Read More</p>
				<li className={styles.linkItem}>
					<a href='' className={styles.linkItemLink}>
						<div className={styles.linkItemLinkIcon}>
							<PiArticleNyTimes />
						</div>
						<p className={styles.linkItemLinkText}>Read Full Article</p>
					</a>
				</li>
				<li className={styles.linkItem}>
					<a href='' className={styles.linkItemLink}>
						<div className={styles.linkItemLinkIcon}>
							<FaWikipediaW />
						</div>
						<p className={styles.linkItemLinkText}>Wikipedia</p>
					</a>
				</li>
				<li className={styles.linkItem}>
					<a href='' className={styles.linkItemLink}>
						<div className={styles.linkItemLinkIcon}>
							<FaWikipediaW />
						</div>
						<p className={styles.linkItemLinkText}>Rocket - Wikipedia</p>
					</a>
				</li>
				<li className={styles.linkItem}>
					<a href='' className={styles.linkItemLink}>
						<div className={styles.linkItemLinkIcon}>
							<FaWikipediaW />
						</div>
						<p className={styles.linkItemLinkText}>Rocket - Wikipedia</p>
					</a>
				</li>
			</ul>
			<ul className={styles.linksListUl}>
				<p className={styles.linksTitle}>Launch Video</p>
				<li className={styles.linkItem}>
					<a href='' className={styles.linkItemLink}>
						<div className={styles.linkItemLinkIcon}>
							<FaYoutube />
						</div>
						<p className={styles.linkItemLinkText}>Watch Webcast</p>
					</a>
				</li>
			</ul>
		</div>
	);
}
