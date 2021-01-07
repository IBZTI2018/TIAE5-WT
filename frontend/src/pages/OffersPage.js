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
                    title: 'Lai Lifestyle Hotel',
                    description: 'Das Lai Lifestyle Hotel bietet Unterkünfte in Lenzerheide. Die Unterkunft verfügt über eine Skipass-Verkaufsstelle und einen Skiraum sowie eine Bar und eine Gemeinschaftslounge.'
                },
                {
                    id: 2,
                    image: 'https://picsum.photos/id/22/300',
                    title: 'Sunstar Hotel Lenzerheide',
                    description: 'Das Sunstar Hotel Lenzerheide befindet sich in sonniger und ruhiger Lage, 200 m vom Zentrum entfernt und verfügt über einen Innenpool. Wanderwege sowie die Skipisten führen am Hotel vorbei.'
                },
            ]
        }
    }

    render() {
        return (
            <div>
                <h2>Angebotsliste: </h2>
                <div className="row">
                    <div className="col-md-3">
                        asd
                    </div>
                    <div className="col-md-9">
                        {
                            this.state.offers.map(offer => (
                                <Offer key={offer.id} offer={offer} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default OffersPage;
