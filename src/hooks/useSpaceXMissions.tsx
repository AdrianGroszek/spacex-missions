import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
	fetchCrew,
	fetchLaunches,
	fetchLaunchpads,
	fetchPayloads,
	fetchRockets,
} from '../services/spacex';
import type {
	SimplifiedSpaceXCrew,
	SimplifiedSpaceXLaunch,
	SimplifiedSpaceXLaunchpad,
	SimplifiedSpaceXPayload,
	SimplifiedSpaceXRocket,
} from '../services/types';
export type StatusFilterType = 'all' | 'success' | 'failure' | 'pending';
export type SortType = 'name-asc' | 'name-desc' | 'date-acs' | 'date-desc';

export type FilterStateType = {
	status: StatusFilterType;
	search: string;
	sort: SortType;
};

type EnrichedMission = {
	launchData: SimplifiedSpaceXLaunch;
	rocketData: SimplifiedSpaceXRocket;
	launchpadData: SimplifiedSpaceXLaunchpad;
	payloadsData: SimplifiedSpaceXPayload[];
	crewData: SimplifiedSpaceXCrew[];
};

export function useSpaceXMissions(filters: FilterStateType) {
	// fetch data
	const {
		data: launchesData,
		isLoading: isLoadingLaunches,
		error: errorLaunches,
	} = useQuery({
		queryKey: ['launches'],
		queryFn: fetchLaunches,
	});

	const {
		data: rocketsData,
		isLoading: isLoadingRockets,
		error: errorRockets,
	} = useQuery({
		queryKey: ['rockets'],
		queryFn: fetchRockets,
	});

	const {
		data: launchpadsData,
		isLoading: isLoadingLaunchpads,
		error: errorLaunchpads,
	} = useQuery({
		queryKey: ['launchpads'],
		queryFn: fetchLaunchpads,
	});

	const {
		data: payloadsData,
		isLoading: isLoadingPayloads,
		error: errorPayloads,
	} = useQuery({
		queryKey: ['payloads'],
		queryFn: fetchPayloads,
	});

	const {
		data: crewData,
		isLoading: isLoadingCrew,
		error: errorCrew,
	} = useQuery({
		queryKey: ['crew'],
		queryFn: fetchCrew,
	});

	// Enrich data
	const enrichedMissions = useMemo(() => {
		if (
			!launchesData ||
			!rocketsData ||
			!launchpadsData ||
			!payloadsData ||
			!crewData
		) {
			return [];
		}

		const rocketsMap = new Map(rocketsData.map((r) => [r.id, r]));
		const launchpadsMap = new Map(launchpadsData.map((l) => [l.id, l]));
		const payloadsMap = new Map(payloadsData.map((p) => [p.id, p]));
		const crewMap = new Map(crewData.map((c) => [c.id, c]));

		return launchesData.map((launch) => ({
			launchData: launch,
			rocketData: rocketsMap.get(launch.rocket),
			launchpadData: launchpadsMap.get(launch.launchpad),
			payloadsData: launch.payloads
				.map((id) => payloadsMap.get(id))
				.filter(Boolean),
			crewData: launch.crew.map((id) => crewMap.get(id)).filter(Boolean),
		})) as EnrichedMission[];
	}, [launchesData, rocketsData, launchpadsData, payloadsData, crewData]);

	// Apply filters, search and sorting
	const filteredMissions = useMemo(() => {
		let result = [...enrichedMissions];

		// Search
		if (filters.search.trim()) {
			const searchLower = filters.search.toLowerCase().trim();

			result = result.filter(
				(mission) =>
					mission.launchData.name.toLowerCase().includes(searchLower) ||
					mission.rocketData.name.toLowerCase().includes(searchLower) ||
					mission.rocketData.type.toLowerCase().includes(searchLower) ||
					mission.launchpadData.name.toLowerCase().includes(searchLower) ||
					mission.launchpadData.region.toLowerCase().includes(searchLower)
			);
		}

		// Filter by status
		if (filters.status !== 'all') {
			result = result.filter((mission) => {
				switch (filters.status) {
					case 'success':
						return mission.launchData.success === true;
					case 'failure':
						return mission.launchData.success === false;
					case 'pending':
						return (
							mission.launchData.success === null &&
							mission.launchData.upcoming === true
						);
					default:
						return true;
				}
			});
		}

		switch (filters.sort) {
			case 'name-asc':
				return result.sort((a, b) =>
					a.launchData.name < b.launchData.name ? -1 : 1
				);
			case 'name-desc':
				return result.sort((a, b) =>
					a.launchData.name > b.launchData.name ? -1 : 1
				);
			case 'date-acs':
				return result.sort(
					(a, b) =>
						new Date(a.launchData.date_utc).getTime() -
						new Date(b.launchData.date_utc).getTime()
				);
			case 'date-desc':
				return result.sort(
					(a, b) =>
						new Date(b.launchData.date_utc).getTime() -
						new Date(a.launchData.date_utc).getTime()
				);
			default:
				return result;
		}

		// return result;
	}, [enrichedMissions, filters]);

	return {
		missions: filteredMissions,
		allMissions: enrichedMissions,
		filters,
		isLoading:
			isLoadingLaunches ||
			isLoadingRockets ||
			isLoadingLaunchpads ||
			isLoadingPayloads ||
			isLoadingCrew,
		error:
			errorLaunches ||
			errorRockets ||
			errorLaunchpads ||
			errorPayloads ||
			errorCrew,
	};
}
