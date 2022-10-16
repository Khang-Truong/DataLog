import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';

const Barchart = ({ chartData }) => {
	const [cursor, setCursor] = useState('default');
	const changeCursor = () => {
		setCursor((prevState) => {
			console.log('mouse is pointer');
			return 'pointer';
		});
	};

	return (
		<Bar
			data={chartData}
			onMouseEnter={changeCursor}
			style={{ cursor: cursor }}
		/>
	);
};

export default Barchart;
