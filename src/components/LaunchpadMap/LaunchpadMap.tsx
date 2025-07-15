import styles from './LaunchpadMap.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import { PiMouseScrollLight } from 'react-icons/pi';

const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

type LaunchpadMapPropsType = {
	lat: number | null;
	lng: number | null;
	launchpadImage: string | null;
};

export default function LaunchpadMap({
	lat,
	lng,
	launchpadImage,
}: LaunchpadMapPropsType) {
	if (lat === null || lng === null) {
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
					map.scrollWheelZoom.enable();
				} else {
					map.scrollWheelZoom.disable();
				}
			};

			container.addEventListener('wheel', onWheel);

			return () => {
				container.removeEventListener('wheel', onWheel);
			};
		}, [map]);

		return null;
	}

	return (
		<div className={styles.mapContainer}>
			<MapContainer
				center={[lat + 0.012, lng]}
				zoom={13}
				scrollWheelZoom={false}
				style={{ height: '100%', width: '100%' }}>
				<ScrollZoomWithCtrl />
				<TileLayer
					attribution='&copy; <a href="https://www.jawg.io" target="_blank" rel="noopener noreferrer">Jawg Maps</a> & contributors'
					url={`https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${mapApiKey}`}
					crossOrigin=''
				/>
				<Marker position={[lat, lng]} icon={customIcon}>
					{/* <Popup>
						{launchpadImage && (
							<img src={launchpadImage} alt='' className={styles.popupImage} />
							)}
							</Popup> */}
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
