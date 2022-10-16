import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Barchart from './components/Charts/Barchart';
import Linechart from './components/Charts/Linechart';
import Piechart from './components/Charts/Piechart';
import Scatterchart from './components/Charts/Scatterchart';
// import MatrixChart from './components/Charts/Matrixchart';
import { UserData } from './TempData/Data';
import { TemperatureData } from './TempData/RegressionData1';
import { InflationData } from './TempData/RegressionData2';
import { AllFactorsData } from './TempData/RegressionData3';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

function App() {
	const [regression, setRegression] = useState({
		labels: TemperatureData.map((data) => data.date),
		datasets: [
			{
				label: 'Regression based on past sales in CAD',
				data: [5500, 4100, 4900, 6200, 6900, 6100, 6480],
				backgroundColor: 'rgba(75,192,192,1)',
				borderColor: 'rgba(75,192,192,1)',
			},
			{
				label: 'Regression based on temperature in CAD',
				data: TemperatureData.map((data) => data.data),
				backgroundColor: '#50AF95',
				borderColor: '#50AF95',
			},
			{
				label: 'Regression based on inflation in CAD',
				data: InflationData.map((data) => data.data),
				backgroundColor: '#f3ba2f',
				borderColor: '#f3ba2f',
			},
			{
				label: 'Regression based on all factors in CAD',
				data: AllFactorsData.map((data) => data.data),
				backgroundColor: '#2a71d0',
				borderColor: '#2a71d0',
			},
		],
	});
	Chart.register(zoomPlugin);

	return (
		<div className="App">
			<div style={{ width: 700 }}>
				<Linechart chartData={regression} />
			</div>
      {/* <div style={{ width: 700 }}>
				<Barchart chartData={userData1} />
			</div>
      <div style={{ width: 400 }}>
				<Piechart chartData={userData1} />
			</div>
			<div style={{ width: 700 }}>
				<Scatterchart chartData={userData1} />
			</div> */}
			{/* <div style={{ width: 700 }}>
				<MatrixChart chartData={matrix} />
			</div> */}
		</div>
	);
}

export default App;
