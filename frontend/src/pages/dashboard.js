import Navbar from '../components/navbar';
import Chart from 'react-apexcharts'


export default function Dashboard() {

    const conf = {
        series: [{
            name: "Regression based on past sales in CAD",
            data: [5500, 4100, 4900, 6200, 6900, 6100, 6480]
        }, {
            name: "Regression based on temperature in CAD",
            data: [5300, 4000, 4500, 6000, 6500, 6300, 6180]
        }, {
            name: "Regression based on inflation in CAD",
            data: [5350, 4050, 4550, 6050, 6550, 6350, 6280]
        }, {
            name: "Regression based on all factors in CAD",
            data: [5400, 4080, 4600, 6100, 6600, 6200, 6300]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'This Week Sales',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            },
            yaxis: {
                axisTicks: {
                    show: true
                }
            }
        }
    };

    return (
        <>
            <Navbar loading='lazy' />
            <div style={{}} className={`d-flex align-items-center dashboardTemplate`}>

                {/* <div className={`d-flex d-flex justify-content-baseline text-start leftDashboard`} style={{}}>
                    <div className={`d-flex justify-content-between text-start`} style={{ flexDirection: 'column' }}>
                        <h1>Overview</h1>
                        <h6 style={{ marginTop: '5px', marginLeft: '1px' }}>Good morning, John! 👋</h6>
                        <div style={{ flexDirection: 'row', marginTop: '2rem', marginBottom: '2rem' }} className={`d-flex align-items-center`}>
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
                </div>
                <div className={`d-flex justify-content-between text-start rightDashboard`} style={{}}>
                    <div style={{ paddingLeft: '1rem' }}>
                        <h1>Today's Prediction</h1>
                    </div>
                </div> */}

                <div className={`d-flex justify-content-between text-center`} style={{ flexDirection: 'column', width: '100%', margin: '7rem 7rem 7rem 11rem' }}>
                    <h1 style={{ fontSize: '500%' }}>Overview</h1>
                    <h6 style={{ marginTop: '5px', marginLeft: '1px' }}>Good morning, John! 👋</h6>
                    <h1 style={{ margin: '3rem 3rem 1rem 3rem' }}>This Week Prediction</h1>
                    <div>
                        <Chart
                            options={conf.options}
                            series={conf.series}
                        />
                    </div>
                    <h1 style={{ margin: '3rem 3rem 1rem 3rem' }}>This Week Prediction</h1>

                </div>
            </div>
        </>

    );
}