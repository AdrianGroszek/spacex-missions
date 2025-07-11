import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
	fetchLaunches,
	fetchLaunchpads,
	fetchRockets,
} from '../services/spacex';
import type {
	SimplifiedSpaceXLaunch,
	SimplifiedSpaceXLaunchpad,
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

	// Enrich data
	const enrichedMissions = useMemo(() => {
		if (!launchesData || !rocketsData || !launchpadsData) {
			return [];
		}

		const rocketsMap = new Map(rocketsData.map((r) => [r.id, r]));
		const launchpadsMap = new Map(launchpadsData.map((l) => [l.id, l]));

		return launchesData.map((launch) => ({
			launchData: launch,
			rocketData: rocketsMap.get(launch.rocket),
			launchpadData: launchpadsMap.get(launch.launchpad),
		})) as EnrichedMission[];
	}, [launchesData, rocketsData, launchpadsData]);

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

		return result;
	}, [enrichedMissions, filters]);

	return {
		missions: filteredMissions,
		allMissions: enrichedMissions,
		filters,
		isLoading: isLoadingLaunches || isLoadingRockets || isLoadingLaunchpads,
		error: errorLaunches || errorRockets || errorLaunchpads,
	};
}
