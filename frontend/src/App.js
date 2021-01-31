import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

// Components
import { SidebarOverlay, SidebarPanel } from './components/Sidebar';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import CoronaWarning from './components/CoronaWarning';

// Pages
import HomePage from './pages/HomePage';
import OffersPage from './pages/OffersPage';
import HotelsPage from './pages/HotelsPage';
import UserSettingsPage from './pages/UserSettingsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ReservationPage from './pages/ReservationPage';
import RatingPage from './pages/RatingPage';
import BookingPage from './pages/BookingPage';

function App() {
    return (
        <div className="App">
            <Router>
                <SidebarOverlay />
                <Navbar />
                <CoronaWarning />
                <Breadcrumbs />
                <main role="main" className="container">
                    <SidebarPanel />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/offers" component={OffersPage} />
                        <Route path="/hotels" component={HotelsPage} />
                        
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/user_settings" component={UserSettingsPage} />

                        <Route path="/reservation" component={ReservationPage} />
                        <Route path="/rating" component={RatingPage} />
                        <Route path="/booking" component={BookingPage} />
                    </Switch>
                </main>
            </Router>
            <ToastContainer />
        </div>
    );
}

export default App;
