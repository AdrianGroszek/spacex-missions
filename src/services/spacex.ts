import type {
	RawSpaceXLaunch,
	RawSpaceXLaunchpad,
	RawSpaceXRocket,
	SimplifiedSpaceXLaunch,
	SimplifiedSpaceXLaunchpad,
	SimplifiedSpaceXRocket,
} from './types';

export const simplyfyLaunchData = (
	launch: RawSpaceXLaunch
): SimplifiedSpaceXLaunch => ({
	id: launch.id,
	name: launch.name,
	flight_number: launch.flight_number,
	date_utc: launch.date_utc,
	success: launch.success,
	upcoming: launch.upcoming,
	details: launch.details,
	image: launch.links.patch.small,
	landing_attempt: launch.cores[0].landing_attempt,
	landing_success: launch.cores[0].landing_success,
	crew: launch.crew,
	payloads: launch.payloads,
	launchpad: launch.launchpad,
	rocket: launch.rocket,
});

export const simplifyRocketData = (
	rocket: RawSpaceXRocket
): SimplifiedSpaceXRocket => ({
	id: rocket.id,
	name: rocket.name,
	type: rocket.type,
	active: rocket.active,
	description: rocket.description,
	first_flight: rocket.first_flight,
	success_rate_pct: rocket.success_rate_pct,
	cost_per_launch: rocket.cost_per_launch,
	height_meters: rocket.height.meters,
	mass_kg: rocket.mass.kg,
	flickr_image:
		rocket.flickr_images.length > 0 ? rocket.flickr_images[0] : null,
});

export const simplyfyLaunchpadsData = (
	rawData: RawSpaceXLaunchpad
): SimplifiedSpaceXLaunchpad => ({
	id: rawData.id,
	name: rawData.name,
	full_name: rawData.full_name,
	locality: rawData.locality,
	region: rawData.region,
	status: rawData.status,
	launch_attempts: rawData.launch_attempts,
	launch_successes: rawData.launch_successes,
	details: rawData.details,
	image: rawData.images.large.length > 0 ? rawData.images.large[0] : null,
	latitude: rawData.latitude,
	longitude: rawData.longitude,
});

const BASE_URL = 'https://api.spacexdata.com/v4';

export async function fetchLaunches(): Promise<SimplifiedSpaceXLaunch[]> {
	try {
		const res = await fetch(`${BASE_URL}/launches`);

		if (!res.ok) {
			throw new Error(`SpaceX API ERROR: ${res.status} ${res.statusText}`);
		}

		const rawData = await res.json();

		const processedData = rawData.map(simplyfyLaunchData);

		return processedData;
	} catch (error) {
		console.error(`Error fetching ${error}`);
		throw error;
	}
}

export async function fetchLaunch(
	launchId: string
): Promise<SimplifiedSpaceXLaunch> {
	try {
		const res = await fetch(`${BASE_URL}/launches/${launchId}`);

		if (!res.ok) {
			throw new Error(`SpaceX API ERROR: ${res.status} ${res.statusText}`);
		}

		const rawData = await res.json();

		const processedData = simplyfyLaunchData(rawData);

		return processedData;
	} catch (error) {
		console.error(`Error fetching ${error}`);
		throw error;
	}
}

export async function fetchRockets(): Promise<SimplifiedSpaceXRocket[]> {
	try {
		const res = await fetch(`${BASE_URL}/rockets`);

		if (!res.ok) {
			throw new Error(`SpaceX API ERROR: ${res.status} ${res.statusText}`);
		}

		const rawData = await res.json();

		const processedData = rawData.map(simplifyRocketData);

		return processedData;
	} catch (error) {
		console.error(`Error fetching ${error}`);
		throw error;
	}
}

export async function fetchRocket(
	rocketId: string
): Promise<SimplifiedSpaceXRocket> {
	try {
		const res = await fetch(`${BASE_URL}/rockets/${rocketId}`);

		if (!res.ok) {
			throw new Error(`SpaceX API ERROR: ${res.status} ${res.statusText}`);
		}

		const rawData = await res.json();

		const processedData = simplifyRocketData(rawData);

		return processedData;
	} catch (error) {
		console.error(`Error fetching ${error}`);
		throw error;
	}
}

export async function fetchLaunchpads(): Promise<SimplifiedSpaceXLaunchpad[]> {
	try {
		const res = await fetch(`${BASE_URL}/launchpads`);

		if (!res.ok) {
			throw new Error(`SpaceX API ERROR: ${res.status} ${res.statusText}`);
		}

		const rawData = await res.json();

		const processedData = rawData.map(simplyfyLaunchpadsData);

		return processedData;
	} catch (error) {
		console.error(`Error fetching ${error}`);
		throw error;
	}
}

export async function fetchLaunchpad(
	launchpadId: string
): Promise<SimplifiedSpaceXLaunchpad> {
	try {
		const res = await fetch(`${BASE_URL}/launchpads/${launchpadId}`);

		if (!res.ok) {
			throw new Error(`SpaceX API ERROR: ${res.status} ${res.statusText}`);
		}

		const rawData = await res.json();

		const processedData = simplyfyLaunchpadsData(rawData);

		return processedData;
	} catch (error) {
		console.error(`Error fetching ${error}`);
		throw error;
	}
}
