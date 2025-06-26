import { useParams } from 'react-router';

export default function MissionDetailsPage() {
	const { id } = useParams();
	return <div>MissionDetailsPage id: {id}</div>;
}
