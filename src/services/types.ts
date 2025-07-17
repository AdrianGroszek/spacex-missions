// START: Launches Types
type PatchLinks = {
	small: string | null;
	large: string | null;
};

type RedditLinks = {
	campaign: string | null;
	launch: string | null;
	media: string | null;
	recovery: string | null;
};

type FlickrLinks = {
	small: string[];
	original: string[];
};

type Links = {
	patch: PatchLinks;
	reddit: RedditLinks;
	flickr: FlickrLinks;
	presskit: string | null;
	webcast: string | null;
	youtube_id: string | null;
	article: string | null;
	wikipedia: string | null;
};

type Core = {
	core: string;
	flight: number;
	gridfins: boolean;
	legs: boolean;
	reused: boolean;
	landing_attempt: boolean;
	landing_success: boolean | null;
	landing_type: string | null;
	landpad: string | null;
};

type Fairings = {
	reused: boolean | null;
	recovery_attempt: boolean | null;
	recovered: boolean | null;
	ships: string[];
};

type Failure = {
	time: number;
	altitude: number | null;
	reason: string;
};

// Raw data types api/launches
export type RawSpaceXLaunch = {
	fairings: Fairings | null;
	links: Links;
	static_fire_date_utc: string | null;
	static_fire_date_unix: number | null;
	net: boolean;
	window: number | null;
	rocket: string;
	success: boolean | null;
	failures: Failure[];
	details: string | null;
	crew: string[];
	ships: string[];
	capsules: string[];
	payloads: string[];
	launchpad: string;
	flight_number: number;
	name: string;
	date_utc: string;
	date_unix: number;
	date_local: string;
	date_precision: 'half' | 'quarter' | 'year' | 'month' | 'day' | 'hour';
	upcoming: boolean;
	cores: Core[];
	auto_update: boolean;
	tbd: boolean;
	launch_library_id: string | null;
	id: string;
};

// Processed data types api/launches
export type SimplifiedSpaceXLaunch = {
	id: string;
	name: string;
	flight_number: number;
	date_utc: string;
	success: boolean | null;
	upcoming: boolean;
	details: string | null;
	image: string | null;
	landing_attempt: boolean;
	landing_success: boolean | null;
	crew: string[];
	payloads: string[];
	launchpad: string;
	rocket: string;
};
// END: Launches Types

// START: Rockets Types
type Height = {
	meters: number;
	feet: number;
};

type Mass = {
	kg: number;
	lb: number;
};

type Diameter = {
	meters: number;
	feet: number;
};

type Thrust = {
	kN: number;
	lbf: number;
};

type ISP = {
	sea_level: number;
	vacuum: number;
};

type CompositeFairing = {
	height: Height;
	diameter: Diameter;
};

type Payloads = {
	composite_fairing: CompositeFairing;
	option_1: string;
};

type FirstStage = {
	thrust_sea_level: Thrust;
	thrust_vacuum: Thrust;
	reusable: boolean;
	engines: number;
	fuel_amount_tons: number;
	burn_time_sec: number;
};

type SecondStage = {
	thrust: Thrust;
	payloads: Payloads;
	reusable: boolean;
	engines: number;
	fuel_amount_tons: number;
	burn_time_sec: number;
};

type Engines = {
	isp: ISP;
	thrust_sea_level: Thrust;
	thrust_vacuum: Thrust;
	number: number;
	type: string;
	version: string;
	layout: string;
	engine_loss_max: number;
	propellant_1: string;
	propellant_2: string;
	thrust_to_weight: number;
};

type LandingLegs = {
	number: number;
	material: string;
};

type PayloadWeight = {
	id: string;
	name: string;
	kg: number;
	lb: number;
};

export type RawSpaceXRocket = {
	height: Height;
	diameter: Diameter;
	mass: Mass;
	first_stage: FirstStage;
	second_stage: SecondStage;
	engines: Engines;
	landing_legs: LandingLegs;
	payload_weights: PayloadWeight[];
	flickr_images: string[];
	name: string;
	type: string;
	active: boolean;
	stages: number;
	boosters: number;
	cost_per_launch: number;
	success_rate_pct: number;
	first_flight: string;
	country: string;
	company: string;
	wikipedia: string;
	description: string;
	id: string;
};

export type SimplifiedSpaceXRocket = {
	id: string;
	name: string;
	type: string;
	active: boolean;
	description: string;
	first_flight: string;
	success_rate_pct: number;
	cost_per_launch: number;
	height_meters: number;
	mass_kg: number;
	flickr_image: string | null;
};
// END: Rockets Types
// START: Launchpads Types
export type RawSpaceXLaunchpad = {
	id: string;
	name: string;
	full_name: string;
	locality: string;
	region: string;
	status:
		| 'active'
		| 'inactive'
		| 'unknown'
		| 'retired'
		| 'lost'
		| 'under construction';
	launch_attempts: number;
	launch_successes: number;
	details: string | null;
	images: {
		large: string[];
	};
	timezone: string;
	latitude: number | null;
	longitude: number | null;
	launches: string[];
};

export type SimplifiedSpaceXLaunchpad = {
	id: string;
	name: string;
	full_name: string;
	locality: string;
	region: string;
	status:
		| 'active'
		| 'inactive'
		| 'unknown'
		| 'retired'
		| 'lost'
		| 'under construction';
	launch_attempts: number;
	launch_successes: number;
	details: string | null;
	image: string | null;
	latitude: number | null;
	longitude: number | null;
};
// END: Launchpads Types

// START: Payloads Types
export type RawSpaceXPayload = {
	dragon: {
		capsule: string | null;
		mass_returned_kg: number | null;
		mass_returned_lbs: number | null;
		flight_time_sec: number | null;
		manifest: string | null;
		water_landing: boolean | null;
		land_landing: boolean | null;
	} | null;
	name: string;
	type: string;
	reused: boolean;
	launch: string;
	customers: string[];
	norad_ids: number[];
	nationalities: string[];
	manufacturers: string[];
	mass_kg: number | null;
	mass_lbs: number | null;
	orbit: string;
	reference_system: string;
	regime: string;
	longitude: number | null;
	semi_major_axis_km: number | null;
	eccentricity: number | null;
	periapsis_km: number | null;
	apoapsis_km: number | null;
	inclination_deg: number | null;
	period_min: number | null;
	lifespan_years: number | null;
	epoch: string | null;
	mean_motion: number | null;
	raan: number | null;
	arg_of_pericenter: number | null;
	mean_anomaly: number | null;
	id: string;
};

export type SimplifiedSpaceXPayload = {
	id: string;
	name: string;
	type: string;
	mass_kg: number | null;
	orbit: string;
	customers: string[];
	manufacturers: string[];
	reused: boolean;
};
// END: Payloads Types

// START: Crew Types
export type RawSpaceXCrew = {
	name: string;
	agency: string;
	image: string;
	wikipedia: string;
	launches: string[];
	status: 'active' | 'inactive' | 'retired' | 'unknown';
	id: string;
};

export type SimplifiedSpaceXCrew = {
	id: string;
	name: string;
	agency: string;
	image: string;
	wikipedia: string;
	status: 'active' | 'inactive' | 'retired' | 'unknown';
	launches_count: number;
};
// END: Crew Types
