import React, { Component } from 'react';
import Offer from '../components/Offer';
import SearchFilter from '../components/search/SearchFilter';

class OffersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [
                {
                    id: 1,
                    image: 'https://cf.bstatic.com/xdata/images/hotel/square600/258275636.webp?k=7cfc16be39eb9920db34f2f2aef54f1c578d235d44dc35491ec14c4b7bc88c2c&o=',
                    title: 'Sunstar Hotel Lenzerheide',
                    stars: 4,
                    validityend: 1613935237,
                    price: 199.95,
                    description: 'Das Lai Lifestyle Hotel bietet Unterkünfte in Lenzerheide. Die Unterkunft verfügt über eine Skipass-Verkaufsstelle und einen Skiraum sowie eine Bar und eine Gemeinschaftslounge.'
                },
                {
                    id: 2,
                    image: 'https://cf.bstatic.com/xdata/images/hotel/square600/105584107.webp?k=9d5d5e9baf9397fc0e6962146cc96c86ee5b62a083e78157cfaf7c9c666a82e2&o=',
                    title: 'Lai Lifestyle Hotel',
                    stars: 3,
                    validityend: 1613935237,
                    price: 94.95,
                    description: 'Das Sunstar Hotel Lenzerheide befindet sich in sonniger und ruhiger Lage, 200 m vom Zentrum entfernt und verfügt über einen Innenpool. Wanderwege sowie die Skipisten führen am Hotel vorbei.'
                },
                {
                    id: 222,
                    image: 'https://cf.bstatic.com/xdata/images/hotel/square600/98421580.webp?k=779ca3f21d9995a2749513589a84c3d74d9c0cde5194d1c5023aba70ff0052d5&o=',
                    title: 'PRIVÀ Alpine Lodge',
                    stars: 4,
                    validityend: 1613935237,
                    price: 159.95,
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
                    <div className="col-md-4">
                        <SearchFilter />
                    </div>
                    <div className="col-md-8">
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
