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
				style={{ paddingRight: '2rem', paddingLeft: '6.5rem' }}
				className={`align-items-center dashboardTemplate`}
			>
				<div style={{ width: '50%' }} className={`align-items-center`}>
					<div style={{width:'15rem'}}>
						<button className={`btn bttn`}>
							<label htmlFor="customFile" style={{ width: '100%', cursor: 'pointer' }}>
								Upload CSV
							</label>
						</button>
						<input
							type="file"
							accept="application/pdf"
							id="customFile"
							style={{ visibility: "hidden" }}
							onChange={(e) => guardarArchivo(e)}
						/>
					</div>

				</div>
			</div>
		</div>
	);
}
