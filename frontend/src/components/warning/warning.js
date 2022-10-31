import MatrixRainingLetters from "../backgrounds/binarybackground"

export default function WindowWarning() {
    return (
        <div>
            <div className={`d-flex-row align-items-center`} style={{ zIndex: '99', height: '100vh', width: '100vw'}}>
                <div style={{ zIndex: '99', position:'absolute', top:'45%', width: '100%'}}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '500%' }}>􀥺</h1>
                        <div>
                            <h2>Window size is too small...</h2>
                            <h2>Please resize your window.</h2>
                        </div>
                    </div>
                </div>
                <div style={{ filter: 'blur(10px)' }}>
                    <MatrixRainingLetters loading='lazy' />
                </div>
            </div>
        </div>
    )
}