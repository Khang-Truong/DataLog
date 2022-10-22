import Navbar from '../components/navbar';
import { xLabels, yLabels } from '../TempData/HeatmapData';
import Heatmap from '../components/Charts/Heatmap';

export default function Analysis() {
	return (
		<>
			<Navbar />
			<div
				style={{ width: 1100, paddingLeft: '103px' }}
				className={`align-items-center dashboardTemplate`}
			>
				<h1>Market basket analysis</h1>
				<Heatmap xlabelsProp={xLabels} ylabelsProp={yLabels} />
			</div>
		</>
	);
}
