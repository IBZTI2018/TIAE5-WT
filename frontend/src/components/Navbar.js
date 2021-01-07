function Navbar() {
    return (
        <div class="bg-dark py-5">
            <div class="d-flex container">
                <div class="row col-sm align-self-center">
                    <h3 class="text-white">Hotelreservationssystem</h3>
                </div>
                <div class="row col-sm align-self-center justify-content-end">
                    <button class="btn btn-primary" type="button" data-toggle="canvas" data-target="#bs-canvas-right"
                        aria-expanded="false" aria-controls="bs-canvas-right">&#9776; Konto</button>
                </div>
                <hr />
            </div>
        </div>
    );
}

export default Navbar;