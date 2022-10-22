import Navbar from '../components/navbar';

export default function TrainModel() {
	function guardarArchivo(e) {
		var file = e.target.files[0]; //the file
		var reader = new FileReader(); //this for convert to Base64
		reader.readAsDataURL(e.target.files[0]); //start conversion...
		reader.onload = function (e) {
			//.. once finished..
			var rawLog = reader.result.split(',')[1]; //extract only thee file data part
			var dataSend = {
				dataReq: { data: rawLog, name: file.name, type: file.type },
				fname: 'uploadFilesToGoogleDrive',
			}; //preapre info to send to API
			fetch(
				'https://script.google.com/macros/s/AKfycbyA--9bEjAFml8X7jnL4_hPChIkWPojWJ3WO5o0PQ5_mmsw3V03trL-6_2TlFQIHGf7/exec', //your AppsScript URL
				{ method: 'POST', body: JSON.stringify(dataSend) }
			) //send to Api
				.then((res) => res.json())
				.then((a) => {
					console.log(a); //See response
				})
				.catch((e) => console.log(e)); // Or Error in console
		};
	}

	return (
		<div>
			<Navbar />
			<div
				style={{ width: 1000, paddingLeft: '103px' }}
				className={`align-items-center dashboardTemplate`}
			>
				<input
					type="file"
					accept="application/pdf"
					id="customFile"
					onChange={(e) => guardarArchivo(e)}
				/>
			</div>
		</div>
	);
}
