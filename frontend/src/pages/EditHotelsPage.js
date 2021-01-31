import React, { Component } from 'react';
import Hotel from '../components/Hotel';



class EditHotelsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hotels: [
                {
                    id: 1,
                    image: 'https://picsum.photos/id/112/300',
                    title: 'Hotel 1',
                    description: 'Das Lai Lifestyle Hotel bietet Unterkünfte in Lenzerheide. Die Unterkunft verfügt über eine Skipass-Verkaufsstelle und einen Skiraum sowie eine Bar und eine Gemeinschaftslounge.'
                },
                {
                    id: 2,
                    image: 'https://picsum.photos/id/22/300',
                    title: 'Hotel 2',
                    description: 'Das Sunstar Hotel Lenzerheide befindet sich in sonniger und ruhiger Lage, 200 m vom Zentrum entfernt und verfügt über einen Innenpool. Wanderwege sowie die Skipisten führen am Hotel vorbei.'
                },
                {
                    id: 222,
                    image: 'https://picsum.photos/id/222/300',
                    title: 'Hotel 3   ',
                    description: 'Das Sunstar Hotel Lenzerheide befindet sich in sonniger und ruhiger Lage, 200 m vom Zentrum entfernt und verfügt über einen Innenpool. Wanderwege sowie die Skipisten führen am Hotel vorbei.'
                },
            ]
        }
    }    

    render() {
        return (
            <div>
                <h2>Hotel list: </h2>
                <div className="row">
                    <div className="col-md-12">
                        {
                            this.state.hotels.map(hotel => (
                                <Hotel data={hotel} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default EditHotelsPage;