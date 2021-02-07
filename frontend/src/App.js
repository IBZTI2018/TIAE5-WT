import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import CoronaWarning from './components/CoronaWarning';

// Pages
import HomePage from './pages/HomePage';
import OffersPage from './pages/OffersPage';
import HotelsPage from './pages/HotelsPage';
import HotelRoomPage from './pages/HotelRoomPage';
import HotelEquipmentPage from './pages/HotelEquipmentPage';
import HotelRoomEquipmentPage from './pages/HotelRoomEquipmentPage';
import UserPage from './pages/UserPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ReservationPage from './pages/ReservationPage';
import RatingPage from './pages/RatingPage';
import BookingPage from './pages/BookingPage';
import ConfirmBookingPage from './pages/ConfirmBookingPage';

function App() {
    return (
        <div className="App">
            <Router>
                <Sidebar />
                <Navbar />
                <CoronaWarning />
                <Breadcrumbs />
                <main role="main" className="container">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/offers" component={OffersPage} />
                        <Route path="/hotels" component={HotelsPage} />

                        <Route path="/hotelrooms" component={HotelRoomPage} />
                        <Route path="/hotelequipments" component={HotelEquipmentPage} />
                        <Route path="/hotelroomequipments" component={HotelRoomEquipmentPage} />
                        
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/user" component={UserPage} />

                        <Route path="/reservation" component={ReservationPage} />
                        <Route path="/rating" component={RatingPage} />
                        <Route path="/booking" component={BookingPage} />
                        <Route path="/confirmbooking" component={ConfirmBookingPage} />
                    </Switch>
                </main>
            </Router>
            <ToastContainer />
        </div>
    );
}

export default App;
