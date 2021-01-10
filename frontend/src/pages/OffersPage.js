import React, { Component } from 'react';
import Offer from '../components/Offer';

class OffersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [
                {
                    id: 1,
                    image: 'https://picsum.photos/id/112/300',
                    title: 'Angebot 1',
                    description: 'Das Lai Lifestyle Hotel bietet Unterkünfte in Lenzerheide. Die Unterkunft verfügt über eine Skipass-Verkaufsstelle und einen Skiraum sowie eine Bar und eine Gemeinschaftslounge.'
                },
                {
                    id: 2,
                    image: 'https://picsum.photos/id/22/300',
                    title: 'Agenbot 2',
                    description: 'Das Sunstar Hotel Lenzerheide befindet sich in sonniger und ruhiger Lage, 200 m vom Zentrum entfernt und verfügt über einen Innenpool. Wanderwege sowie die Skipisten führen am Hotel vorbei.'
                },
                {
                    id: 222,
                    image: 'https://picsum.photos/id/222/300',
                    title: 'Angebot 3   ',
                    description: 'Das Sunstar Hotel Lenzerheide befindet sich in sonniger und ruhiger Lage, 200 m vom Zentrum entfernt und verfügt über einen Innenpool. Wanderwege sowie die Skipisten führen am Hotel vorbei.'
                },
            ]
        }
        console.log("banane");
        console.log(this.props.location.data);
        console.log("apfel");
    }

    render() {
        return (
            <div>
                <h2>Angebotsliste: </h2>
                <div className="row">
                    <div className="col-md-3">
                        Filter Knöpüfe für Angebote<br />
                        Und Einstellungen wie Anzsahl Sterne<br />
                        Orte, usw.  
                    </div>
                    <div className="col-md-9">
                        {
                            this.state.offers.map(offer => (
                                <Offer data={offer} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default OffersPage;
