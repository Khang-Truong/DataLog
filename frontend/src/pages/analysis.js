import Navbar from '../components/navbar';
import { xLabels, yLabels } from '../TempData/HeatmapData';
import Heatmap from '../components/Charts/Heatmap';
import GaugeChart from '../components/Charts/Gaugechart';

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

			<div
				style={{ width: 700, paddingLeft: '103px' }}
				className={`align-items-center dashboardTemplate`}
			>
				<h1>Transaction Speed</h1>
				<GaugeChart/>
			</div>
		</>
	);
}
