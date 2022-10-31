import { v4 } from 'uuid'

export const UserData = [
	{
		id: 1,
		date: '2022-08-21',
		userGain: 82600,
		userLost: 823,
	},
	{
		id: 2,
		date: '2022-08-22',
		userGain: 45627,
		userLost: 345,
	},
	{
		id: 3,
		date: '2022-08-23',
		userGain: 78568,
		userLost: 555,
	},
	{
		id: 4,
		date: '2022-08-24',
		userGain: 93400,
		userLost: 4855,
	},
	{
		id: 5,
		date: '2022-08-25',
		userGain: 4300,
		userLost: 234,
	},
	{
		id: 6,
		date: '2022-08-26',
		userGain: 87000,
		userLost: 1823,
	},
	{
		id: 7,
		date: '2022-08-27',
		userGain: 42677,
		userLost: 2345,
	},
	{
		id: 8,
		date: '2022-08-28',
		userGain: 24588,
		userLost: 555,
	},
	{
		id: 9,
		date: '2022-08-29',
		userGain: 74000,
		userLost: 4555,
	},
	{
		id: 10,
		date: '2022-08-30',
		userGain: 4300,
		userLost: 234,
	},
];

export const businesses = [
	{
		id: v4(),
		name: 'Business Test 1',
		users: [{
			id: v4(),
			firstname: 'John',
			lastname: 'Doe',
			username: 'asdfasdf',
			password: 'asdfasdf',
			email: 'john@email.com',
			business: 'Business Test 1',
			newuser: true
		}]
	}, 
	{
		id: v4(),
		name: 'Business Test 2',
		users: [{
			id: v4(),
			firstname: 'Jane',
			lastname: 'Doe',
			username: 'asdfasdf',
			password: 'asdfasdf',
			email: 'Jane@email.com',
			business: 'Business Test 2',
			newuser: true
		}]
	}
]