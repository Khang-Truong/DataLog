import React from 'react';
import {MatrixElement, MatrixController} from 'chartjs-chart-matrix';
import Chart, { Chart as chartjs } from 'chart.js/auto';

const MatrixChart = ({chartData}) => {
    Chart.register(MatrixElement,MatrixController);
	return <MatrixElement data={chartData}/>;
};

export default MatrixChart;
