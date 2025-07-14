import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './PayloadCard.module.css';
import { fetchPayloads } from '../../services/spacex';
import type { SimplifiedSpaceXPayload } from '../../services/types';

type CrewCardPropsType = {
	payloadsIds: string[];
};

export default function PayloadCard({ payloadsIds }: CrewCardPropsType) {
	const queryClient = useQueryClient();

	const cachedPayloads: SimplifiedSpaceXPayload[] | undefined =
		queryClient.getQueryData(['payloads']);

	const { data: fallbackPayloads, isLoading } = useQuery({
		queryKey: ['payloads'],
		queryFn: fetchPayloads,
		enabled: !cachedPayloads, // if no cached data
	});

	if (isLoading) return <div>Loading...</div>;

	const payloads = cachedPayloads || fallbackPayloads;

	const filteredPayloads = payloads?.filter((payload) =>
		payloadsIds.includes(payload.id)
	);

	console.log(filteredPayloads);

	return (
		<>
			<p className={styles.textGray}>Payloads</p>
			{!filteredPayloads ||
				(filteredPayloads.length === 0 && (
					<div className={styles.noPayloadInfo}>
						<p>This was a payload-free mission.</p>
					</div>
				))}
			<div className={styles.payloads}>
				{filteredPayloads?.map((payload) => (
					<div className={styles.payloadsItem} key={payload.id}>
						<span className={styles.payloadsItemTitle}>{payload.name}</span>
						<span>
							Type: <span className={styles.textWhite}>{payload.type}</span>
						</span>
						<span>
							Customer:{' '}
							<span className={styles.textWhite}>
								{payload.customers.at(0)}
							</span>
						</span>
						{payload.mass_kg && (
							<span>
								Mass:{' '}
								<span className={styles.textWhite}>{payload.mass_kg} kg</span>
							</span>
						)}
						<span>
							Orbit: <span className={styles.textWhite}>{payload.orbit}</span>
						</span>
					</div>
				))}
			</div>
		</>
	);
}
