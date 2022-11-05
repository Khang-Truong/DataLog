import React, { useState } from 'react';
import Navbar from '../components/navbar';
import {SentimentData} from '../TempData/SentimentData';
import Piechart from '../components/Charts/Piechart';

const SentimentAnalysis = () => {

	const [sentimentData, setSentimentData] = useState({
		labels: SentimentData.map((user) => user.name),
		datasets: [
			{
				data: SentimentData.map((data) => data.rate),
				backgroundColor: [
					'rgba(75,192,192,1)',
					'#ecf0f1',
					'#50AF95',
					'#f3ba2f',
					'#2a71d0',
				],
				borderColor: 'black',
				borderWidth: 1,
			},
		],
	});

	return (
		<>
			<Navbar />
			<div style={{ width: 500 , paddingLeft: '103px' }} className={`align-items-center dashboardTemplate`}>
				<Piechart chartData={sentimentData} />
			</div>
		</>
	);
};

export default SentimentAnalysis;
