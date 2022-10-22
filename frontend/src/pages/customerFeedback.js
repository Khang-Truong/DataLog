import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Chart } from 'chart.js';
import { SentimentData } from '../TempData/sentimentData';
import Piechart from '../components/Charts/Piechart';

export default function CustomerFeedback() {
	const [sentiment, setSentiment] = useState({
		labels: SentimentData.map((data) => data.label),
		datasets: [
			{
				// label: 'Users Gained',
				data: SentimentData.map((data) => data.data),
				backgroundColor: [
					'rgba(75,192,192,1)',
					'#ecf0f1',
					'#50AF95',
				],
				borderColor: 'black',
				borderWidth: 1,
			},
		],
	});
	return (
		<>
			<Navbar />
			<div
				style={{ width: 1000 , paddingLeft:"103px"}}
				className={`align-items-center dashboardTemplate`}
			>
				<Piechart chartData={sentiment} />
			</div>
		</>
	);
}
