import React, { useRef } from 'react';
import { Chart, Line } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';
import { resetZoom } from 'chartjs-plugin-zoom';

const Linechart = ({ chartData }) => {
	const options = {
		scales: {
			x: {
				grid: {
					display: false,
				},
			},

			y: {
				grid: {
					display: false,
				},
			},
		},
		animations: {
			radius: {
				duration: 400,
				easing: 'linear',
				loop: (context) => context.active,
			},
		},
		hoverRadius: 12,
		hoverBackgroundColor: 'yellow',
		plugins: {
			zoom: {
				pan: {
					enabled: true,
					mode: 'xy',
					threshold: 5,
				},
				zoom: {
					wheel: {
						enabled: true,
					},
					pinch: {
						enabled: true,
					},
					mode: 'xy',
				},
			},
		},
	};

	const chartRef = useRef(null);
	const handleReset = () => {
		console.log('clicked');
		chartRef.current.resetZoom();
	};

	return (
		<>
			<Line ref={chartRef} data={chartData} options={options} />
			<button className={`btn`} onClick={handleReset}>Reset Zoom</button>
		</>
	);
};

export default Linechart;
