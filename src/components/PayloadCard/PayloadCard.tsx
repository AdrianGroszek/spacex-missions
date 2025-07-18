import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './PayloadCard.module.css';
import { fetchPayloads } from '../../services/spacex';
import type { SimplifiedSpaceXPayload } from '../../services/types';
import {
	FaIndustry,
	FaSatellite,
	FaUser,
	FaWeightHanging,
} from 'react-icons/fa';
import { IoIosRocket } from 'react-icons/io';

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

	// console.log(filteredPayloads);

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
						<div className={styles.payloadHeaderWrapper}>
							<div className={styles.payloadHeader}>
								<p className={styles.payloadName}>{payload.name}</p>
								{payload.reused ? (
									<p>
										Reused <span className={styles.textGreen}>♻</span>
									</p>
								) : (
									<p>
										First flight{' '}
										<span className={styles.textWhite}>
											<IoIosRocket />
										</span>
									</p>
								)}
							</div>
							<span>{payload.type}</span>
						</div>
						<div className={styles.payloadInfoGrid}>
							{payload.customers.length !== 0 && (
								<div className={styles.payloadInfoWrapper}>
									<div className={styles.iconContainer}>
										<FaUser />
									</div>
									<div>
										<p>Customer</p>
										<p className={styles.textWhite}>
											{payload.customers.at(0)}
										</p>
									</div>
								</div>
							)}
							{payload.manufacturers.length !== 0 && (
								<div className={styles.payloadInfoWrapper}>
									<div className={styles.iconContainer}>
										<FaIndustry />
									</div>
									<div>
										<p>Manufacturer</p>
										<p className={styles.textWhite}>
											{payload.manufacturers.at(0)}
										</p>
									</div>
								</div>
							)}
							{payload.mass_kg && (
								<div className={styles.payloadInfoWrapper}>
									<div className={styles.iconContainer}>
										<FaWeightHanging />
									</div>
									<div>
										<p>Mass</p>
										<p className={styles.textWhite}>
											{payload.mass_kg?.toLocaleString()} kg
										</p>
									</div>
								</div>
							)}
							<div className={styles.payloadInfoWrapper}>
								<div className={styles.iconContainer}>
									<FaSatellite />
								</div>
								<div>
									<p>Orbit</p>
									<p className={styles.textWhite}>
										{payload.orbit} {payload.regime && `(${payload.regime})`}
									</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
