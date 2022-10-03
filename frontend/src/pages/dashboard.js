import Navbar from '../components/navbar';

export default function Dashboard() {

    return (
        <>
            <Navbar />
            <div style={{}} className={`d-flex align-items-center dashboardTemplate`}>

                <div className={`d-flex d-flex justify-content-baseline text-start leftDashboard`} style={{}}>
                    <div className={`d-flex justify-content-between text-start`} style={{ flexDirection: 'column' }}>
                        <h1>Overview</h1>
                        <h6 style={{ marginTop: '5px', marginLeft: '1px' }}>Good morning, John! 👋</h6>
                        <div style={{ flexDirection: 'row', marginTop:'2rem', marginBottom:'2rem' }} className={`d-flex align-items-center`}>
                            <div className={`card card-container`} id={`smallCard`}>
                                <h5 style={{margin:'1.3pt'}}>Yesterday's Revenue</h5>
                                <h5 style={{margin:'1.3pt'}}>$21,500</h5>
                                <h5 style={{margin:'1.3pt', color:'green'}}>􀄯 12%</h5>
                            </div>
                            <div className={`card card-container`} id={`smallCard`}>
                                <h5 style={{margin:'1.3pt'}}>Projected Revenue</h5>
                                <h5 style={{margin:'1.3pt'}}>$19,780</h5>
                                <h5 style={{margin:'1.3pt', color:'red'}}>􀄯 8%</h5>
                            </div>
                        </div>
                    </div>


                </div>
                <div className={`d-flex justify-content-between text-start rightDashboard`} style={{}}>
                    <div style={{ paddingLeft: '1rem' }}>
                        <h1>Today's Prediction</h1>
                    </div>
                </div>
            </div>
        </>

    );
}