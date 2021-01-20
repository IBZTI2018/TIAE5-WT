function Navbar() {
    return (
        <div className="bg-dark py-5">
            <div className="d-flex container">
                <div className="row col-sm align-self-center">
                    <h3 className="text-white">Hotelreservationssystem</h3>
                </div>
                <div className="row col-sm align-self-center justify-content-end">
                    <button className="btn btn-primary" type="button" data-toggle="canvas" data-target="#bs-canvas-right"
                        aria-expanded="false" aria-controls="bs-canvas-right">&#9776; Konto</button>
                </div>
                <hr />
            </div>
        </div>
    );
}

export default Navbar;