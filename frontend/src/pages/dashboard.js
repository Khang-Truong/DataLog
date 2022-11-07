import Navbar from '../components/navbar';
import { UserData } from '../TempData/UserData';
import BarchartFilterDate from '../components/Charts/BarchartFilterDate';
import NewUser from '../components/warning/new-user';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authService from '../services/auth.service';
import axios from 'axios';


export default function Dashboard() {
	let { businessname } = useParams();

	const initialDate = UserData.map((user) => user.date);
	const initialDataPoint = UserData.map((data) => data.userGain);

	const [newUser, setNewUser] = useState(false)
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

	const navigate = useNavigate()

	useEffect(() => {
		if (!('user' in localStorage)) {
			navigate('/')
		} else {
			setNewUser(user.newuser)
		}
	}, [])

	return (
		<>
			<div>
				{/* <Navbar /> */}
				<div style={{}} className={`d-flex align-items-center dashboardTemplate`}>
					<div
						className={`d-flex d-flex justify-content-baseline text-start leftDashboard`}
						style={{}}
					>
						<div
							className={`d-flex justify-content-between text-start`}
							style={{ flexDirection: 'column' }}
						>
							<h1>Overview</h1>
							<h6 style={{ marginTop: '5px', marginLeft: '1px' }}>
								Good morning, {user.firstname}! 👋
							</h6>
							<div
								style={{
									flexDirection: 'row',
									marginTop: '2rem',
									marginBottom: '2rem',
								}}
								className={`d-flex align-items-center`}
							>
								<div className={`card card-container`} id={`smallCard`}>
									<h5 style={{ margin: '1.3pt' }}>Yesterday's Revenue</h5>
									<h5 style={{ margin: '1.3pt' }}>$21,500</h5>
									<h5 style={{ margin: '1.3pt', color: 'green' }}>􀄯 12%</h5>
								</div>
								<div className={`card card-container`} id={`smallCard`}>
									<h5 style={{ margin: '1.3pt' }}>Projected Revenue</h5>
									<h5 style={{ margin: '1.3pt' }}>$19,780</h5>
									<h5 style={{ margin: '1.3pt', color: 'red' }}>􀄯 8%</h5>
								</div>
							</div>
						</div>

						<div style={{ width: '100%', padding: '1.5rem' }}>
							<BarchartFilterDate
								initialDate={initialDate}
								initialDataPoint={initialDataPoint}
								label={'Revenue'}
							/>
						</div>
					</div>
					<div
						className={`d-flex justify-content-between text-start rightDashboard`}
						style={{}}
					>
						<div style={{ paddingLeft: '1rem' }}>
							<h1>Today's Prediction</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
