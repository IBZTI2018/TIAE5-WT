import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
import ReservationPage from './pages/ReservationPage';
import RatingPage from './pages/RatingPage';

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
                        <Route path="/user_settings" component={UserSettingsPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/reservation" component={ReservationPage} />
                        <Route path="/rating" component={RatingPage} />
                    </Switch>
                </main>
            </Router>
        </div>
    );
}

export default App;
