function Navbar() {
    return (
        <div className="d-flex">
            <div className="row col-sm align-self-center">
                <img className="img-fluid" src="https://via.placeholder.com/350x150" alt="" />
            </div>
            <div className="row col-sm align-self-center justify-content-center">
                <h3>Hotelreservationssystem</h3>
            </div>
            <div className="row col-sm align-self-center justify-content-end">
                <button className="btn btn-primary" type="button" data-toggle="canvas" data-target="#bs-canvas-right"
                    aria-expanded="false" aria-controls="bs-canvas-right">&#9776; Konto</button>
            </div>
        </div>
    );
}

export default Navbar;