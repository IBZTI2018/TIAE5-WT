import { useHistory } from 'react-router-dom';

function BookingSearchInput() {
    const history = useHistory();
    const goToResults = () => history.push('/results');
    
    return (
        <div className="input-group input-group-lg mt-5">
            <input type="text" className="form-control" placeholder="Nach Hotel / Gebiet / Angebot suchen..."
                aria-label="Nach Hotel / Gebiet / Angebot suchen..." aria-describedby="basic-addon2" />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">Von / Bis</button>
                <button className="btn btn-outline-secondary" type="button">Gäste</button>
                <button className="btn btn-primary" type="button" onClick={goToResults}>Suchen</button>
            </div>
        </div>
    );
}

export default BookingSearchInput;