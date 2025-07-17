import styles from './LaunchpadMap.module.css';
import { Marker as LeafletMarker } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { PiMouseScrollLight } from 'react-icons/pi';
import type { SimplifiedSpaceXLaunchpad } from '../../services/types';

const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

type LaunchpadMapPropsType = {
	launchpadData: SimplifiedSpaceXLaunchpad;
};

export default function LaunchpadMap({ launchpadData }: LaunchpadMapPropsType) {
	const markerRef = useRef<LeafletMarker>(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			markerRef.current?.openPopup();
		}, 0); // lub 100ms jeśli nadal nie działa

		return () => clearTimeout(timeout);
	}, []);

	if (launchpadData.latitude === null || launchpadData.longitude === null) {
		return <p>Location not available for this launch site.</p>;
	}

	const customIcon = L.divIcon({
		className: 'custom-marker',
		html: `<div style="background-color: #1f6feb; width: 18px; height: 18px; border-radius: 50%; border: 2px solid white;"></div>`,
		iconSize: [16, 16],
		iconAnchor: [8, 8], // środek
	});

	// scroll controller
	function ScrollZoomWithCtrl() {
		const map = useMap();

		useEffect(() => {
			const container = map.getContainer();

			const onWheel = (e: WheelEvent) => {
				if (e.ctrlKey) {
					e.preventDefault();
					map.scrollWheelZoom.enable();
				} else {
					map.scrollWheelZoom.disable();
				}
			};

			container.addEventListener('wheel', onWheel, { passive: false });

			return () => {
				container.removeEventListener('wheel', onWheel);
			};
		}, [map]);

		return null;
	}

	return (
		<div className={styles.mapContainer}>
			<MapContainer
				center={[launchpadData.latitude - 0.2, launchpadData.longitude + 1]}
				zoom={8}
				scrollWheelZoom={false}
				style={{ height: '100%', width: '100%' }}>
				<ScrollZoomWithCtrl />
				<TileLayer
					attribution='&copy; <a href="https://www.jawg.io" target="_blank" rel="noopener noreferrer">Jawg Maps</a> & contributors'
					url={`https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${mapApiKey}`}
					crossOrigin=''
				/>
				<Marker
					position={[launchpadData.latitude, launchpadData.longitude]}
					icon={customIcon}
					ref={markerRef}>
					<Popup>
						{launchpadData.image && (
							<div>
								<p>
									{launchpadData.full_name} - ({launchpadData.region})
								</p>
							</div>
						)}
					</Popup>
				</Marker>
			</MapContainer>
			<div className={styles.hint}>
				<p>Hold Ctrl and scroll</p>
				<PiMouseScrollLight />
			</div>
			<div className={`${styles.mapOverlay} ${styles.mapOverlayTop}`}></div>
			<div className={`${styles.mapOverlay} ${styles.mapOverlayBottom}`}></div>
		</div>
	);
}
